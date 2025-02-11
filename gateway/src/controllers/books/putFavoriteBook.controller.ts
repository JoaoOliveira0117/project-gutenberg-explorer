import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class PutFavoriteBookController extends BooksController {
  async handle() {
    const { id } = this.params as { id: string };

    return await this.service.putFavoriteBook(id, this.user.id);
  }
}

export default withController(PutFavoriteBookController);