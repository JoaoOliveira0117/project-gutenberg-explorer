import withController from "../../utils/withController.js";
import FavoriteController from "./favorite.controller.js";

class PostFavoriteBook extends FavoriteController {
  async handle() {
    const { user_id, book_id } = this.params as { user_id: string, book_id: string };

    return this.service.insert({ user_id, book_id });
  }
}

export default withController(PostFavoriteBook);