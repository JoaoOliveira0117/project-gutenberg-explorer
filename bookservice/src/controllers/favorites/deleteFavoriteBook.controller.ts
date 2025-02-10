import withController from "../../utils/withController.js";
import FavoriteController from "./favorite.controller.js";

class DeleteFavoriteBook extends FavoriteController {
  async handle() {
    const { user_id, book_id } = this.params as { user_id: string, book_id: string };

    const service = await this.service

    return service.removeFavorite(user_id, book_id);
  }
}

export default withController(DeleteFavoriteBook);