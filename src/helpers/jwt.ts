import jwt, { SignOptions } from 'jsonwebtoken';
import { AuthInterface } from './types';
const jwtSecret = process.env.SECRET_KEY || 'secret';

const jwtConfigs: SignOptions = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

export const generateToken = (auth: AuthInterface) => {
  return jwt.sign(auth, jwtSecret, jwtConfigs);
};

export const verifyToken = (authorization: string) => {
  try {
    const token = authorization.split(' ')[1];
    return jwt.verify(token, jwtSecret) as AuthInterface;
  } catch (error) {
    return null;
  }
};
