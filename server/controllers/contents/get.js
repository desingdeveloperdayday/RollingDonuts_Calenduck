import { Contents } from '../../models';

export default async (data) => {
  const { id } = data;
  return Contents.findOne({ where: { id } });
};
