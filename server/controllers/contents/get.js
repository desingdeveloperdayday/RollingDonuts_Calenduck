import { Contents, Images } from '../../models';

export default async (params) => {
  const { id } = params;

  const result = await Contents.findOne({
    where: { id, deletedAt: null },
    include: ['images'],
  });

  if (!result) return { code: 404, data: 'not found' };

  return { code: 200, data: result };
};
