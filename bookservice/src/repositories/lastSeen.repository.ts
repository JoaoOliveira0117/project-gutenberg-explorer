import { SupabaseClient } from "@supabase/supabase-js";
import db from "../config/db.js";
import { Database } from "../config/db.types.js";

export type LastSeenRequest = {
  user_id: string;
  book_id: string;
}

export type LastSeenResponse = {
  user_id: string;
  book_id: string;
  created_at: string;
}

export default class LastSeenRepository {
  protected db;

  constructor(db: SupabaseClient<Database, "public", any>) {
    this.db = db.from('user_last_seen_books');
  }

  static async init() {
    const database = await db();
    return new LastSeenRepository(database);
  }

  async addLastSeen(favorite: LastSeenRequest): Promise<LastSeenResponse> {
    const { error, data } = await this.db.upsert(
      { ...favorite, created_at: new Date().toISOString() },
      { onConflict: 'user_id,book_id' }
    ).single();

    if (error) {
      throw error;
    }

    return data;
  }
}