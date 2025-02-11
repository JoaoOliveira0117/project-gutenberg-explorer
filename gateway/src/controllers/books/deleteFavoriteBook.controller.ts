import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class DeleteFavoriteBook extends BooksController {
  async handle() {
    const { id } = this.params as { id: string };

    return this.service.deleteFavoriteBook(id, this.user.id);
  }
}

export default withController(DeleteFavoriteBook);