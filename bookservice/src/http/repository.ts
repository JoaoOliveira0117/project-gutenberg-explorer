import { PostgrestError } from "@supabase/supabase-js";
import HttpError from "./error.js";

export class Repository {
  handleError(error: PostgrestError) {
    return new HttpError(
      error.message,
      "Last Seen Repository",
      [error.message, error.details],
      error,
      500
    );
  }
}