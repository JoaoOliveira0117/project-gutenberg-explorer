import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../config/db.types.js";
import db from "../config/db.js";
import { FavoritesRequest } from "./favorites.repository.js";
import NotFound from "../http/errors/notFound.error.js";
import { Repository } from "../http/repository.js";

export type BookRequest = {
  id: string;
  book_id: string;
  title: string;
  authors: string[];
  issue_date: string;
  language: string;
  locc: string;
  subjects: string[];
  tags: string[];
  book_url?: string;
}

export type BookResponse = BookRequest & {
  user_favorite_books: FavoritesRequest;
  created_at: string;
}

export default class BooksRepository extends Repository {
  protected db;

  constructor(db: SupabaseClient<Database, "public", any>) {
    super()
    this.db = db.from('books');
  }

  static async init() {
    const database = await db();
    return new BooksRepository(database);
  }

  async findAllBooks(user_id: string, fields?: string, search?: string, page = 1, pageSize = 25): Promise<BookResponse[]> {
    const selectFields = fields || "*";

    let result = this.db
      .select(`user_favorite_books!left(book_id), ${selectFields}`)
      .eq('user_favorite_books.user_id', user_id)

    if ((search as string)?.trim()) {
      const conditions = [
        `title.ilike.%${search}%`,
      ];

      conditions.push(`tags.cs.{${search}}`);
      conditions.push(`subjects.cs.{${search}}`);

      if (!isNaN(Number(search))) {
        conditions.push(`id.eq.${search}`);
        conditions.push(`book_id.eq.${search}`);
      }

      result = result.or(conditions.join(","));
    }

    const { error, data } = await result.range(page - 1, page + (pageSize - 1 )).returns<BookResponse[]>();

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }

  async findAllFavoriteBooks(user_id: string, fields?: string, page = 1, pageSize = 25): Promise<BookResponse[]> {
    const selectFields = fields || "*";

    let result = this.db
      .select(`user_favorite_books!inner(book_id,created_at), ${selectFields}`)
      .eq('user_favorite_books.user_id', user_id)
      .order('user_favorite_books(created_at)', { ascending: true })

    const { error, data } = await result.range(page - 1, page + (pageSize - 1 )).returns<BookResponse[]>();

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }
  
  async findAllLastSeenBooks(user_id: string, fields?: string): Promise<BookResponse[]> {
    const selectFields = fields || "*";

    let result = this.db
      .select(`user_last_seen_books!inner(book_id,created_at), ${selectFields}`)
      .eq('user_last_seen_books.user_id', user_id)
      .order('user_last_seen_books(created_at)', { ascending: false })

    const { error, data } = await result.limit(10).returns<BookResponse[]>();

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }

  async findBookById(id: string, user_id: string, fields?: string): Promise<BookResponse> {
    const selectFields = fields || "*";

    let result = this.db
      .select(`user_favorite_books!left(book_id), ${selectFields}`)
      .eq('user_favorite_books.user_id', user_id)
      .eq('id', id);

    const { error, data } = await result.returns<BookResponse>().single();

    if (!data) {
      throw new NotFound("Book not found", "Books Repository")
    }

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }

  async findFavoriteBooks(user_id: string, fields?: string, page = 1, pageSize = 25) {
    const selectFields = fields || "*";

    const { error, data } = await this.db
     .select(`user_favorite_books!right(book_id), ${selectFields}`)
     .eq('user_favorite_books.user_id', user_id)
     .range(page - 1, page + (pageSize - 1 ))
     .returns<BookResponse[]>();

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }

  async findLastSeenBooks(user_id: string, fields?: string) {
    const selectFields = fields || "*";

    const { error, data } = await this.db
     .select(`user_last_seen_books!right(book_id), ${selectFields}`)
     .eq('user_last_seen_books.user_id', user_id)
     .limit(5)
     .returns<BookResponse[]>();

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }

  async updateBookById(user_id: string, book_id: string, body: Partial<BookRequest>, fields?: string) {
    await this.findBookById(book_id, user_id);
    const selectFields = fields || "*";

    const { error, data } = await this.db
      .update(body)
      .eq('id', book_id)
      .select(`user_favorite_books!left(book_id), ${selectFields}`)
      .single()

    if (error) {
      throw this.handleError(error);
    }

    return data;
  }
}