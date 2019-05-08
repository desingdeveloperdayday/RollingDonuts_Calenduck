import { contents } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.params;

    await contents.delete({ id });

    return response.status(200).end();
  } catch (error) {
    return response.status(500).send('internal server error').end();
  }
};
