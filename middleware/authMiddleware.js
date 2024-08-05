import pkg from 'jsonwebtoken';
const { verify } = pkg;
import config from 'config';
import { getCookie } from 'cookies-next';

export default function (req, res, next) {
  // Recherche du jeton dans le cookie
  const token = getCookie('token', { req, res });

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Vérification du jeton
    const decoded = verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
