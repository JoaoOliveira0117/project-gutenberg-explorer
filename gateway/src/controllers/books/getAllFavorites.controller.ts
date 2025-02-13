import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetAllFavoritesBooks extends BooksController {
  async handle() {
    const { skip = 0, take = 25 } = this.getPagination();

    return this.service.getBooks({ ...this.query, skip, take }, this.user.id, 'favorites');
  }
}

export default withController(GetAllFavoritesBooks);