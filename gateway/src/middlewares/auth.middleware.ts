import { NextFunction, Request, Response } from 'express';
import Unauthorized from '../http/errors/unauthorized.error.js';
import AuthService from '../services/auth.js';

const authMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!;

    const authService = new AuthService();

    (req as Request & { user: any }).user = await authService.getUserMe(token);

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

export default authMiddleware;
