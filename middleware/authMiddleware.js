import pkg from 'jsonwebtoken';
const { verify } = pkg;
import config from 'config';

export default function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = verify(token, config.get('jwtSecret')); // Utilisation de config.get
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

