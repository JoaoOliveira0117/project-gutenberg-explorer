import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetAllLastSeenBooks extends BooksController {
  async handle() {
    const { page, pageSize } = this.query as { page: string, pageSize: string }

    return this.service.getBooks({ ...this.query, page, pageSize }, this.user.id, 'last-seen');
  }
}

export default withController(GetAllLastSeenBooks);