import { users } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.user;

    const { code, data } = await users.delete({ id });

    if (!code || !data) {
      return response.status(500).send('internal server error');
    }

    return response.status(code).send(data);
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
