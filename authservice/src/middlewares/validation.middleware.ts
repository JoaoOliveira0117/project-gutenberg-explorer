import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

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
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation Error',
        error: {
          formatted: formatZodError(error as ZodError),
          raw: {
            ...error
          }
        }
      });
    }

    res.status(400).json({ error });
  }
}

export default validate;