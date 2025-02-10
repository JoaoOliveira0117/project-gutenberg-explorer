import db from "../config/db.js";
import BooksRepository from "../repositories/books.repository.js";

export default class BooksService {
  protected repository;

  private constructor(db: any) {
    this.repository = new BooksRepository(db);
  }

  static async init() {
    const database = await db();

    return new BooksService(database);
  }

  async findAllBooks(user_id: string, fields?: string[], search?: string, page?: number, pageSize?: number) {
    return this.repository.findAllBooks(user_id, fields, search, page, pageSize);
  }

  async findBookById(id: string, user_id: string, fields?: string[]) {
    return this.repository.findBookById(id, user_id, fields);
  }

  async findFavoriteBooks(user_id: string, fields?: string[], page?: number, pageSize?: number) {
    return this.repository.findFavoriteBooks(user_id, fields, page, pageSize);
  }

  async findLastSeenBooks(user_id: string, fields?: string[]) {
    return this.repository.findLastSeenBooks(user_id, fields);
  }
}