import { Users } from '../../models';

export default async (id) => {
  const result = await Users.findOne({
    where: { id },
    attributes: ['id', 'email', 'name', 'bookmark', 'createdAt', 'updatedAt'],
  });

  if (!result) return { code: 404, data: 'not found' };

  return { code: 200, data: result };
};
