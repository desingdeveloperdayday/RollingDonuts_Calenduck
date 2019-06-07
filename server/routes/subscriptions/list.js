import { subscriptions } from '../../controllers';

export default async (request, response) => {
  try {
    const { lang, name } = request.query;

    if (!lang || typeof lang !== 'string') {
      return response.status(400).send('invalid lang');
    }

    if (!name || typeof name !== 'string') {
      return response.status(400).send('invalid name');
    }

    const { code, data } = await subscriptions.list({ lang, name });

    if (!code || !data) {
      return response.status(500).send('internal server error');
    }

    return response.status(code).send(data);
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
