import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/security.js';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = await decodeToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
