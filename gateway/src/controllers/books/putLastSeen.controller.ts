import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class PostLastSeenBook extends BooksController {
  async handle() {
    const { id } = this.params as { id: string };

    return this.service.putLastSeenBook(id, this.user.id);
  }
}

export default withController(PostLastSeenBook);