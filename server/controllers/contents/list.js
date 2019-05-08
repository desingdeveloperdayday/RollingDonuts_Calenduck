import { Op } from 'sequelize';
import { Contents } from '../../models';

export default async (data) => {
  const { from, to, page, category } = data;

  const query = {};

  query.where = {};

  query.where.deletedAt = null;

  const start = from ? new Date(from)
    : new Date(new Date().setMonth(new Date().getMonth() - 1));

  const end = to ? new Date(to) : new Date();

  query.where.createdAt = {
    [Op.between]: [start, end],
  };

  query.offset = page ? (page - 1) * 10 : 0;

  query.limit = page ? page * 10 : 10;

  query.where.categoryId = category ? category : delete query.where['categoryId'];

  return Contents.findAll(query);
};
