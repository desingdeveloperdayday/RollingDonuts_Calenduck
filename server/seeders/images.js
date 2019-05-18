import { Images } from '../models';

export default async (transaction) => {
  const images = [
    {
      key: 'firsttestimagekey',
      userId: 1,
      contentId: 1,
      categoryId: 1,
      subscriptionId: 1,
      createdAt: new Date(),
    },
    {
      key: 'secondtestimagekey',
      userId: 1,
      contentId: 1,
      categoryId: 1,
      subscriptionId: 1,
      createdAt: new Date(),
    },
  ];

  return Images.bulkCreate(images, { transaction });
};
