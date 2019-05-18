import { sequelize } from '../models';
import categories from './categories';
import users from './users';
import subscriptions from './subscriptions';
import contents from './contents';
import images from './images';

const { server, database } = require('../config').default;

export default async () => {
  if (server.production || !database.sync) return {};

  return sequelize.transaction(async (transaction) => {
    const categorySeeds = await categories(transaction);
    const subscriptionSeeders = await subscriptions(transaction);
    const userSeeds = await users(transaction);
    const contentSeeds = await contents(transaction);
    const imageSeeds = await images(transaction);
    return {
      categorySeeds, userSeeds, subscriptionSeeders, imageSeeds, contentSeeds,
    };
  });
};
