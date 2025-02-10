import { StatusCodes } from "http-status-codes";
import HttpError from "../error.js";

export default class UnprocessableEntity extends HttpError {
  constructor(
    message = "Unprocessable Entity",
    name?: string,
    formatted?: string[],
    error?: Error
  ) {
    super(message, name, formatted, error, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}