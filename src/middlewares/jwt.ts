import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt';

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: {
        message: 'Token não informado',
      },
    });
  }
  const user = verifyToken(authorization);
  if (!user) {
    return res.status(401).json({
      error: {
        message: 'Token inválido',
      },
    });
  }
  req.params.userId = String(user.id);
  next();
};
