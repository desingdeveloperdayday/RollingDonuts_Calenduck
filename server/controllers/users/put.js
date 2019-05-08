import { Users } from '../../models';

export default async (data) => {
  const { id, email, password, bookmark } = data;

  const user = await Users.findOne({ where: { id } });

  if (!user) return { code: 404, data: 'not found' };

  const values = { email, password, bookmark, updatedAt: new Date() };

  const result = await Users.update(values, { where: { id } });

  if (!result) {
    return { code: 500, data: 'can not update. please try again' };
  }

  return { code: 200, data: result };
};
