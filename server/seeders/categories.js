import { Categories } from '../models';

export default async (transaction) => {
  const categories = [
    'concert',
    'fanmeeting',
    'live',
  ];

  const data = categories.map(item => ({ name: item, createdAt: new Date() }));

  return Categories.bulkCreate(data, { transaction });
};
