import jwt from 'jsonwebtoken';
import { Users } from '../../models';

const config = require('../../config').default.auth;

export default async (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) return response.status(401).send('unauthorized');

  const user = jwt.verify(token, config.secret, (error, decode) => (error ? error.name : decode));

  if (!user.id) return response.status(401).send('unauthorized');

  if (user === 'TokenExpiredError') {
    const refreshToken = request.headers.refresh;

    const refresh = jwt.verify(refreshToken, config.refreshSecret, (error, decode) => {
      if (error) return response.status(401).send('unauthorized');
      return decode;
    });

    if (token !== refresh.access) {
      return response.status(401).send('unauthorized');
    }

    const payload = { id: refresh.id, email: refresh.email };

    const options = { algorithm: config.algorithm, expiresIn: config.expiresIn };

    const newAccess = jwt.sign(payload, config.secret, options);

    const refreshPayload = { newAccess };

    const refreshOptions = { algorithm: config.algorithm, expiresIn: config.refreshExpiresIn };

    const newRefresh = jwt.sign(refreshPayload, config.refreshSecret, refreshOptions);

    return response.status(401).send({ access: newAccess, refresh: newRefresh });
  }

  const account = await Users.findOne({
    where: { id: user.id, email: user.email, deletedAt: null },
  });

  if (!account) return response.status(401).send('unauthorized');

  request.user = { id: user.id, email: user.email };

  return next();
};
