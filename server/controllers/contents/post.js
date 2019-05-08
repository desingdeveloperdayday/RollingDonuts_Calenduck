import awsSdk from 'aws-sdk';
import uuid from 'uuid/v4';
import fs from 'fs';
import { Contents, Images, sequelize } from '../../models';

const config = require('../../config').default;
const { aws } = config;

export default async (data) => {
  const { id, title, text, category, files } = data;

  awsSdk.config.update(aws);
  const s3 = new awsSdk.S3();

  const locations = files.map(item => {
    const Body = fs.createReadStream(item.path);
    return s3.upload({
      Bucket: aws.bucket,
      Key: `${uuid()}.${item.mimetype.split('/')[1]}`,
      Body,
      ACL: 'public-read',
    }).promise();
  });

  if (!locations) return { code: 500, data: 'can not upload images' };

  const result = await sequelize.transaction(async transaction => {
    const content = await Contents.create({
      title,
      text,
      categoryId: category,
      createdAt: new Date(),
      userId: id,
    }, transaction);

    if (!content) return { code: 500, data: 'can not create content' };

    const images = locations.map(item => {
      return {
        path: item,
        createdAt: new Date(),
        userId: id,
        contentId: content.id,
        categoryId: category,
      };
    });

    await Images.bulkCreate(images, transaction);

    return content;
  });

  if (!result) return { code: 500, data: 'internal server error' };

  return { code: 201, data: result };
};
