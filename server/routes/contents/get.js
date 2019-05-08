import { contents } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.params;

    if (!id || id < 1) {
      return response.status(400).send();
    }

    const result = await contents.get({ id });
    return response.status(200).send(result).end();
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
