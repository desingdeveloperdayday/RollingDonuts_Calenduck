import { images } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.user;
    const { from, to, page } = request.query;

    if (!from || !to || !page || page < 1) {
      return response.status(400).send('invalid query');
    }

    if ((new Date(new Date(to).setMonth(new Date().getMonth() - 1)) > new Date(from))
      || (new Date(from) > new Date(to))) {
      return response.status(400).send('invalid range of date');
    }

    const { code, data } = await images.list({ id, ...request.query });

    if (!code || !data) {
      return response.status(500).send('internal server error');
    }

    return response.status(code).send(data);
  } catch (error) {
    return response.status(500).send('internal server error');
  }
};
