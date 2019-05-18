import { Users } from '../../models';

export default async (params) => {
  const { id } = params;

  const user = await Users.findOne({ where: { id, deletedAt: null } });

  if (!user) return { code: 404, data: 'not found' };

  const result = await Users.update({ password: '', deletedAt: new Date() }, { where: { id } });

  if (!result) return { code: 500, data: 'internal server error' };

  return { code: 200, data: result };
};
