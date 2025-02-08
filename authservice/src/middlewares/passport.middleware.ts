import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const passportMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
  passport.authenticate('google')(req, res, next);
};

export const passportCallbackMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
  passport.authenticate('google', { session: false, failureRedirect: '/' })( req, res, next );
}