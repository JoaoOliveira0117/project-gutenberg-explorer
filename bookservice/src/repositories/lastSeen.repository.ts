import { SupabaseClient } from "@supabase/supabase-js";
import db from "../config/db.js";
import { Database } from "../config/db.types.js";
import BooksRepository from "./books.repository.js";
import HttpError from "../http/error.js";
import { Repository } from "../http/repository.js";

export type LastSeenRequest = {
  user_id: string;
  book_id: string;
}

export type LastSeenResponse = {
  user_id: string;
  book_id: string;
  created_at: string;
}

export default class LastSeenRepository extends Repository {
  protected db;
  private booksRepository: BooksRepository;

  constructor(db: SupabaseClient<Database, "public", any>, booksRepository: BooksRepository) {
    super();
    this.db = db.from('user_last_seen_books');
    this.booksRepository = booksRepository;
  }

  static async init() {
    const database = await db();
    const booksRepository = await BooksRepository.init();
    return new LastSeenRepository(database, booksRepository);
  }

  async addLastSeen(favorite: LastSeenRequest): Promise<LastSeenResponse> {
    await this.booksRepository.findBookById(favorite.book_id, favorite.user_id);

    const { error, data } = await this.db.upsert(
      { ...favorite, created_at: new Date().toISOString() },
      { onConflict: 'user_id,book_id' }
    ).single();

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }
}