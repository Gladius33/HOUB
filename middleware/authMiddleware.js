import pkg from 'jsonwebtoken';
const { verify } = pkg;
import config from 'config';

export default function (req, res, next) {
  // Recherche du jeton dans l'en-tête Authorization
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extraction du jeton du format Bearer <token>
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ msg: 'Token not found' });
  }

  try {
    const decoded = verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
