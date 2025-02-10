import db from "../config/db.js";
import FavoritesRepository, { FavoritesRequest } from "../repositories/favorites.repository.js";

export default class FavoritesService {
  protected repository;

  private constructor(repository: FavoritesRepository) {
    this.repository = repository;
  }

  static async init() {
    const favoritesRepository = await FavoritesRepository.init();
    return new FavoritesService(favoritesRepository);
  }

  async addFavorite(favorite: FavoritesRequest) {
    return this.repository.addFavorite(favorite);
  }

  async removeFavorite(user_id: string, book_id: string) {
    return this.repository.removeFavorite({ user_id, book_id });
  }
}