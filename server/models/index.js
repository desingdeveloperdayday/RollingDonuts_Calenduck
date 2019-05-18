import Sequelize from 'sequelize';
import sequelize from './sequelize';

import users from './users';
import contents from './contents';
import images from './images';
import categories from './categories';
import subscriptions from './subscriptions';

const Users = users(sequelize, Sequelize);
const Contents = contents(sequelize, Sequelize);
const Images = images(sequelize, Sequelize);
const Categories = categories(sequelize, Sequelize);
const Subscriptions = subscriptions(sequelize, Sequelize);

Users.hasMany(Contents);
Users.hasMany(Images);
Contents.hasMany(Images);
Categories.hasMany(Contents);
Categories.hasMany(Images);
Subscriptions.hasMany(Users);
Subscriptions.hasMany(Contents);
Subscriptions.hasMany(Images);

export {
  sequelize, Users, Contents, Images, Categories, Subscriptions,
};
