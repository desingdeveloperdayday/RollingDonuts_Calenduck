export default (sequelize, DataTypes) => sequelize.define('subscriptions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ko: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  en: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  modelName: 'subscriptions',
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'subscriptions',
  sequelize,
});
