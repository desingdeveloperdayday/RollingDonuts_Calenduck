import awsSdk from 'aws-sdk';
import uuid from 'uuid/v4';
import fs from 'fs';
import { Contents, Images, sequelize } from '../../models';

const { aws } = require('../../config').default;

export default async (params) => {
  const {
    id, userId, title, text, categoryId, files,
  } = params;

  awsSdk.config.update(aws);

  const s3 = new awsSdk.S3();

  const oldContent = await Contents.findOne({
    where: { id, userId, deletedAt: null },
    include: ['images'],
  });

  if (!oldContent) return { code: 404, data: 'not found' };

  const result = await sequelize.transaction(async (transaction) => {
    if (oldContent.images && oldContent.images.length > 0) {
      const deleted = await s3.deleteObjects({
        Bucket: aws.bucket,
        Delete: { Objects: oldContent.images.map(item => ({ Key: item.key })) },
      }).promise().then(() => true).catch(() => false);

      if (!deleted) return false;

      await Images.update(
        { deletedAt: new Date() },
        { where: { id: oldContent.images.map(item => item.id) } }, { transaction },
      );
    }

    const content = await Contents.update({
      title,
      text,
      categoryId,
      updatedAt: new Date(),
    }, { where: { id: oldContent.id } }, { transaction });

    if (!files || files.length < 1) return content;

    const uploaded = [];

    async function upload() {
      const file = files.splice(0, 1)[0];
      const body = fs.createReadStream(file.path);
      return s3.upload({
        Bucket: aws.bucket,
        Key: `${uuid()}.${file.mimetype.split('/')[1]}`,
        Body: body,
        ACL: 'public-read',
      }).promise().then(async (uploadResult) => {
        if (files.length) {
          uploaded.push(uploadResult);
          return upload();
        }
        uploaded.push(uploadResult);
        return uploaded;
      }).catch(async () => {
        await Contents.destroy({ where: { id: content.id } }, { transaction });
        return false;
      });
    }
    const uploadedFiles = await upload();

    if (!uploadedFiles) return false;

    const fileDatas = uploadedFiles.map(item => ({
      key: item.Key,
      createdAt: new Date(),
      userId,
      contentId: id,
      categoryId,
    }));

    const updated = params;

    updated.files = await Images.bulkCreate(fileDatas, { transaction });

    return updated;
  });

  if (!result) return { code: 500, data: 'internal server error' };

  return { code: 200, data: result };
};
