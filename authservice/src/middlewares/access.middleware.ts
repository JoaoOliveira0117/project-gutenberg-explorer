import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/security.js';
import Unauthorized from '../http/errors/unauthorized.error.js';
import Secrets from '../config/secrets.js';

export const accessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.path.startsWith('/api-docs')) {
      next();
      return;
    }

    const apiKey = req.header("x-api-key");
    const secrets = await Secrets.initialize()
    const API_KEY = await secrets.getSecret('API_KEY');

    if (!apiKey || apiKey !== API_KEY) {
      throw new Unauthorized(
        'No Api Key provided', 
        "Auth Error",
        ["No Api Key provided"]
      );
    }

    next();
  } catch (error) {
    next(error)
  }
};
