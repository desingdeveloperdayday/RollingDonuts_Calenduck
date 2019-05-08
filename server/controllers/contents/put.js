import awsSdk from 'aws-sdk';
import uuid from 'uuid/v4';
import fs from 'fs';
import { Contents, Images, sequelize } from '../../models';

const config = require('../../config').default;
const { aws } = config;

export default async (data) => {
  const { id, userId, title, text, category, files } = data;

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

  return sequelize.transaction(async transaction => {
    const content = await Contents.update({
      title,
      text,
      categoryId: category,
      updatedAt: new Date(),
    }, transaction);

    const images = locations.map(item => {
      return {
        path: item,
        createdAt: new Date(),
        userId,
        contentId: id,
        categoryId: category,
      };
    });

    await Images.bulkCreate(images, transaction);

    return content;
  });
};
