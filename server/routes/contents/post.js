import { contents } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.user;
    const {
      title, text, categoryId,
    } = request.body;

    if (!title || typeof title !== 'string' || title.length > 30) {
      return response.status(400).send('title is missing');
    }

    if (!categoryId || Number.isNaN(categoryId) || categoryId < 1) {
      return response.status(400).send('invalid categoryId');
    }

    if (typeof text !== 'string' || text.length > 100) {
      return response.status(400).send('text type is not string or too long');
    }

    const { code, data } = await contents.post({ id, ...request.body, files: request.files });

    if (!code || !data) {
      return response.status(500).send('internal server error');
    }

    return response.status(code).send(data);
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
