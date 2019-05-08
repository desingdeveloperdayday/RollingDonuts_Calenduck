import { contents } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.user;
    const { title, text, category } = request.body;

    if (!title || typeof title !== 'string' || title.length > 30) {
      return response.status(400).send('title is missing').end();
    }

    if (!category || (category * 1) < 0) {
      return response.status(400).send('invalid category').end();
    }

    if (typeof text !== 'string' || text.length > 100) {
      return response.status(400).send('text type is not string or too long');
    }

    const { code, data } = await contents.post({ id, ...request.body, files: request.files });

    return response.status(code).send(data).end();
  } catch (error) {
    return response.status(500).send('internal server error').end();
  }
};
