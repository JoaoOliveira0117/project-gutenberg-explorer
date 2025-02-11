import { StatusCodes } from "http-status-codes";
import HttpError from "../error.js";

export default class Unauthorized extends HttpError {
  constructor(
    message = "Not Found", 
    name?: string,
    formatted?: string[],
    error?: Error,
  ) {
    super(message, name, formatted, error, StatusCodes.UNAUTHORIZED);
  }
}