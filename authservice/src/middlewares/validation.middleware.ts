import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import UnprocessableEntity from "../http/errors/unprocessableEntity.error.js";
import HttpError from "../http/error.js";

const formatZodError = (err: ZodError) => {
  const formattedErrors = err.issues.map((issue) => 
    `${issue.path.join('.')}: ${issue.message}`
  );

  return formattedErrors;
}

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const error = new UnprocessableEntity(
        "Validation Error",
        "Zod Error",
        formatZodError(err as ZodError),
        err
      )
      return next(error)
    }

    const error = new HttpError("Unable to validate schema")
    return next(error);
  }
}

export default validate;