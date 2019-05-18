import { Users } from '../../models';

export default async (params) => {
  const {
    id, email, password, bookmark, subscriptionId,
  } = params;

  const user = await Users.findOne({ where: { id, deletedAt: null } });

  if (!user) return { code: 404, data: 'not found' };

  if ((user.bookmark + bookmark) < 0) return { code: 400, data: 'invalid bookmark' };

  const values = {
    email, password, bookmark, subscriptionId, updatedAt: new Date(),
  };

  const result = await Users.update(values, { where: { id } });

  if (!result) {
    return { code: 500, data: 'can not update. please try again' };
  }

  return { code: 200, data: result };
};
