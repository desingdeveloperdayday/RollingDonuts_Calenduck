import { auth } from '../../controllers';

export default async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email) {
      return response.status(400).send('invalid email');
    }

    if (!password) {
      return response.status(400).send('invalid password');
    }

    const { code, data } = await auth.post({ email, password });

    if (!code || !data) {
      return response.status(500).send('internal server error');
    }

    return response.status(code).send(data);
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
