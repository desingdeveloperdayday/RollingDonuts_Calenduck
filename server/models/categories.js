export default (sequelize, DataTypes) => sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  modelName: 'categories',
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'categories',
  sequelize,
});
