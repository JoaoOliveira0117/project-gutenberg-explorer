import { PostgrestError } from "@supabase/supabase-js";
import HttpError from "./error.js";

export class Repository {
  handleError(error: PostgrestError) {
    console.log(error.code)
    return new HttpError(
      error.message,
      "Repository",
      [error.message, error.details],
      error,
      500
    );
  }
}