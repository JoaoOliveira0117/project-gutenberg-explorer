import { StatusCodes } from 'http-status-codes';

export default class HttpError extends Error {
  protected formattedErrorMessage: string[];
  protected rawError: any;
  public statusCode: number;

  constructor(
    message = "Internal Server Error",
    name?: string,
    formatted?: string[],
    error?: Error,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name || '(Http Error)';
    this.formattedErrorMessage = formatted || [message];
    this.rawError = error || {
      message
    };
  }

  public toJson() {
    return {
      success: false,
      status: this.statusCode,
      message: this.message,
      error: {
        formatted: this.formattedErrorMessage,
        raw: this.rawError,
      }
    }
  }
}