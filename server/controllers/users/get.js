import { Users } from '../../models';

export default async (params) => {
  const { id } = params;

  const result = await Users.findOne({
    where: { id, deletedAt: null },
    attributes: ['id', 'email', 'name', 'bookmark', 'createdAt', 'updatedAt', 'subscriptionId'],
  });

  if (!result) return { code: 404, data: 'not found' };

  return { code: 200, data: result };
};
