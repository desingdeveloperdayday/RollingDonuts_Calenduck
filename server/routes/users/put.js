import { users } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.user;
    const {
      email, password, bookmark, subscriptionId,
    } = request.body;

    if (!email && !password && !bookmark) {
      return response.status(400).send('all data is empty');
    }

    if (!email || typeof email !== 'string' || email.length > 30) {
      return response.status(400).send('invalid email');
    }

    if (!password || typeof password !== 'string' || password.length < 8 || password.length > 14) {
      return response.status(400).send('invalid password');
    }

    if (!bookmark || Number.isNaN(bookmark)) {
      return response.status(400).send('invalid bookmark');
    }

    if (!subscriptionId || Number.isNaN(subscriptionId) || subscriptionId < 1) {
      return response.status(400).send('invalid subscriptionId');
    }

    const params = {
      id, email, password, bookmark: bookmark * 1, subscriptionId: subscriptionId * 1,
    };

    const { code, data } = await users.put(params);

    if (!code || !data) {
      return response.status(500).send('internal server error');
    }

    return response.status(code).send(data);
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
