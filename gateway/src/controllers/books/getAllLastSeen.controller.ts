import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetAllLastSeenBooks extends BooksController {
  async handle() {
    const { skip = 0, take = 25 } = this.getPagination();

    return this.service.getBooks({ ...this.query, skip, take }, this.user.id, 'last-seen');
  }
}

export default withController(GetAllLastSeenBooks);