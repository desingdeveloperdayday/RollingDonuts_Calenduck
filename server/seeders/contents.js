import { Contents } from '../models';

export default async (transaction) => {
  const content = {
    title: 'test',
    text: 'this is test contents',
    userId: 1,
    categoryId: 1,
    subscriptionId: 1,
    createdAt: new Date(),
  };

  return Contents.create(content, { transaction });
};
