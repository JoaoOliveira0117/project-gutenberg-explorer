import basicAuth from 'basic-auth';
import { NextFunction, Request, Response } from 'express';

export const swaggerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = basicAuth(req);

  if (!user || user.name !== process.env.SWAGGER_USER || user.pass !== process.env.SWAGGER_PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send("Acesso negado: credenciais inválidas.");
  }

  next();
};
