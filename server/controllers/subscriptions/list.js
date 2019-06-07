import { Op } from 'sequelize';
import { Subscriptions } from '../../models';

export default async (params) => {
  const { lang, name } = params;

  const query = {};

  if (lang === 'ko') query.where = { ko: { [Op.like]: name } };
  if (lang === 'en') query.where = { en: { [Op.like]: name } };

  const result = await Subscriptions.findAll(query);

  if (!result) return { code: 500, data: 'internal server error' };

  return { code: 200, data: result };
};
