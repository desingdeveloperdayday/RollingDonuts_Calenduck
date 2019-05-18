import crypto from 'crypto';

export default (sequelize, DataTypes) => sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kakao: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  bookmark: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  report: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  hooks: {
    beforeCreate: (user) => {
      Object.assign(user, {
        password: crypto.createHash('sha512').update(user.password).digest('hex'),
      });
    },
    beforeBulkUpdate: (user) => {
      Object.assign(user.attributes, {
        password: crypto.createHash('sha512').update(user.attributes.password).digest('hex'),
      });
    },
  },
  modelName: 'users',
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'users',
  sequelize,
});
