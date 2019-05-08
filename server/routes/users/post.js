import { users } from '../../controllers';

export default async (request, response) => {
  try {
    const {
      email, password, name,
    } = request.body;

    if (!email || typeof email !== 'string' || email.length > 30) {
      return response.status(400).send('invalid email').end();
    }

    if (!password || typeof password !== 'string' || password.length < 8 || password.length > 14) {
      return response.status(400).send('invalid password').end();
    }

    if (!name || typeof name !== 'string' || name.length < 2 || name.length > 12) {
      return response.status(400).send('invalid name').end();
    }

    const { code, data } = await users.post(request.body);

    if (!code || !data) {
      return response.status(500).send('internal server error').end();
    }

    return response.status(code).send(data).end();
  } catch (error) {
    return response.status(500).send('internal server error').end();
  }
};
