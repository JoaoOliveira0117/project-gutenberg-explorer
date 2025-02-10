import db from "../config/db.js";
import FavoritesRepository, { FavoritesRequest } from "../repositories/favorites.repository.js";

export default class FavoritesService {
  protected repository;

  private constructor(db: any) {
    this.repository = new FavoritesRepository(db);
  }

  static async init() {
    const database = await db();

    return new FavoritesService(database);
  }

  async addFavorite(favorite: FavoritesRequest) {
    return this.repository.addFavorite(favorite);
  }

  async removeFavorite(user_id: string, book_id: string) {
    return this.repository.removeFavorite(user_id, book_id);
  }
}