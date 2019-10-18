import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  //Pegando apenas o token do array
  const [, token] = authHeader.split(' ');

  try {
    //Callback assincrono próprio
    jwt.verify(token, authConfig.secret, (error, response) => {
      if (!error && response) {
        req.body._id = response._id;

        return next();
      } else {
        return res.status(401).json({ error: 'Token inválido' });
      }
    });
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}