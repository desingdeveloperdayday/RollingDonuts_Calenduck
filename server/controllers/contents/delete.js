import { Contents, Images, sequelize } from '../../models';

export default async (data) => {
  const { id } = data;

  return sequelize.transaction(async transaction => {
    await Contents.update({ deletedAt: new Date() }, { where: { id } }, transaction);
    await Images.update({ deletedAt: new Date() }, { where: { contentId: id } }, transaction);
  });
};
