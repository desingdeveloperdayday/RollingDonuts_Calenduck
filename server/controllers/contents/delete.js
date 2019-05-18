import awsSdk from 'aws-sdk';
import { Contents, Images, sequelize } from '../../models';

const { aws } = require('../../config').default;

export default async (params) => {
  const { id, userId } = params;

  const checkContent = await Contents.findOne({
    where: { id, userId, deletedAt: null },
    include: [{ model: Images, where: { deletedAt: null } }],
  });

  if (!checkContent) return { code: 404, data: 'not found' };

  const result = await sequelize.transaction(async (transaction) => {
    awsSdk.config.update(aws);

    const s3 = new awsSdk.S3();

    if (checkContent.images && checkContent.images.length > 0) {
      const deleted = await s3.deleteObjects({
        Bucket: aws.bucket,
        Delete: { Objects: checkContent.images.map(item => ({ Key: item.key })) },
      }).promise().then(() => true).catch(() => false);

      if (!deleted) return false;
    }

    await Contents.update({ deletedAt: new Date() }, { where: { id } }, { transaction });

    await Images.update({ deletedAt: new Date() }, { where: { contentId: id } }, { transaction });

    return 'success';
  });

  if (!result) return { code: 500, data: 'internal server error' };

  return { code: 200, data: result };
};
