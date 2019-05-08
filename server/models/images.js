export default (sequelize, DataTypes) => sequelize.define('images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  modelName: 'images',
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'images',
  sequelize,
});
