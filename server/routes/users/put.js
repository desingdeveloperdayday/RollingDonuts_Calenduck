import { users } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.user;
    const {
      email, password, bookmark,
    } = request.body;

    if (!email && !password && !bookmark) {
      return response.status(400).send('all data is empty');
    }

    if (!email || typeof email !== 'string' || email.length > 30) {
      return response.status(400).send('invalid email').end();
    }

    if (!password || typeof password !== 'string' || password.length < 8 || password.length > 14) {
      return response.status(400).send('invalid password').end();
    }

    if (!bookmark || typeof (bookmark * 1) !== 'number') {
      return response.status(400).send('invalid bookmark').end();
    }

    const params = {
      id, email, password, bookmark,
    };

    const { code, data } = await users.put(params);

    if (!code || !data) {
      return response.status(500).send('internal server error').end();
    }

    return response.status(code).send(data).end();
  } catch (error) {
    return response.status(500).send('internal server error').end();
  }
};
