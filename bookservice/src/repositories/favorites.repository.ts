import { SupabaseClient } from "@supabase/supabase-js";
import db from "../config/db.js";
import { Database } from "../config/db.types.js";

export type FavoritesRequest = {
  user_id: string;
  book_id: string;
}

export type FavoritesResponse = {
  user_id: string;
  book_id: string;
  created_at: string;
}

export default class FavoritesRepository {
  protected db;

  constructor(db: SupabaseClient<Database, "public", any>) {
    this.db = db.from('user_favorite_books');
  }

  static async init() {
    const database = await db();
    return new FavoritesRepository(database);
  }

  async addFavorite(favorite: FavoritesRequest): Promise<FavoritesResponse> {
    const { error, data } = await this.db.insert(favorite).single();

    if (error) {
      throw error;
    }

    return data;
  }

  async removeFavorite(user_id: string, book_id: string): Promise<FavoritesResponse> {
    const { error, data } = await this.db.delete().eq('user_id', user_id).eq('book_id', book_id).single();

    if (error) {
      throw error;
    }

    return data;
  }
}