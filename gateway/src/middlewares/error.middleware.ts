import { NextFunction, Request, Response } from "express";
import HttpError from "../http/error.js";


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';

  console.error(err);

  if (err?.error?.response?.body) {
    const errorBody = err.error.response.body
    return res.status(errorBody.status).json(errorBody);
  }

  res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
  })
}

export default errorHandler