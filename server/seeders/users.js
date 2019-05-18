import { Users } from '../models';

export default async (transaction) => {
  const data = {
    email: 'test@test.com',
    password: '1q2w3e4r',
    name: 'tester',
    subscriptionId: 1,
    createdAt: new Date(),
  };

  return Users.create(data, { transaction });
};
