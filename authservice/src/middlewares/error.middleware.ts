import { NextFunction, Request, Response } from "express";
import HttpError from "../http/error.js";


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';

  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json(err.toJson());
  }

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  })
}

export default errorHandler