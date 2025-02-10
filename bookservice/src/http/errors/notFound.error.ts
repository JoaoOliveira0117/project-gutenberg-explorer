import { StatusCodes } from "http-status-codes";
import HttpError from "../error.js";

export default class NotFound extends HttpError {
  constructor(
    message = "Not Found", 
    name?: string,
    formatted?: string[],
    error?: Error,
  ) {
    super(message, name, formatted, error, StatusCodes.NOT_FOUND);
  }
}