import Sequelize from 'sequelize';

const config = require('../config').default;

const { name, user, password } = config.database;

export default new Sequelize(name, user, password, config.database);
