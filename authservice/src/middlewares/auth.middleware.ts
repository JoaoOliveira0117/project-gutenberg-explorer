import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/security.js';
import Unauthorized from '../http/errors/unauthorized.error.js';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Unauthorized(
        'No token provided', 
        "Auth Error",
        ["No token provided"]
      );
    }

    const decoded = await decodeToken(token);

    console.log(decoded)

    req.user = decoded;
    next();
  } catch (err: unknown) {
    const error = new Unauthorized(
      'Unauthorized', 
      "Auth Error",
      ["Unauthorized"],
      err as Error
    );
    next(error);
  }
};
