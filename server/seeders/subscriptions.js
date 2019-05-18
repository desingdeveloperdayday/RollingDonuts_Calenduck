import { Subscriptions } from '../models';

export default async (transaction) => {
  const subscriptions = [
    { ko: '청하', en: 'chungha' },
  ];

  const data = subscriptions.map(item => ({ ...item, createdAt: new Date() }));

  return Subscriptions.bulkCreate(data, { transaction });
};
