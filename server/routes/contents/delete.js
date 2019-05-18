import { contents } from '../../controllers';

export default async (request, response) => {
  try {
    const userId = request.user.id;

    const { id } = request.params;

    if (!id || id < 1) {
      return response.status(400).send('invalid id');
    }

    const { code, data } = await contents.delete({ id, userId });

    if (!code || !data) {
      return response.status(500).send('internal server error');
    }

    return response.status(code).send(data);
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
