import awsSdk from 'aws-sdk';
import uuid from 'uuid/v4';
import fs from 'fs';
import {
  Users, Contents, Images, sequelize,
} from '../../models';

const { aws } = require('../../config').default;

export default async (params) => {
  const {
    id, title, text, categoryId, files,
  } = params;

  const { subscriptionId } = await Users.findOne({ where: { id } });

  const result = await sequelize.transaction(async (transaction) => {
    const content = await Contents.create({
      title,
      text,
      categoryId,
      createdAt: new Date(),
      userId: id,
      subscriptionId,
    }, { transaction });

    if (!content) return false;

    if (!files || files.length < 1) return content;

    awsSdk.config.update(aws);

    const s3 = new awsSdk.S3();

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
      userId: id,
      contentId: content.id,
      categoryId,
      subscriptionId,
    }));

    content.dataValues.files = await Images.bulkCreate(fileDatas, { transaction });

    return content;
  });

  if (!result) return { code: 500, data: 'internal server error' };

  return { code: 201, data: result };
};
