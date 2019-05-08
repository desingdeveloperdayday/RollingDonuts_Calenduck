export default (sequelize, DataTypes) => sequelize.define('contents', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
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
  modelName: 'contents',
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'contents',
  sequelize,
});
