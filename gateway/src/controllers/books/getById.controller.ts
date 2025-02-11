import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetById extends BooksController {
  async handle() {
    const { fields } = this.query as { fields: string[], user_id: string };
    const { id } = this.params;

    await this.service.putLastSeenBook(id, this.user.id);
    return this.service.getBookById(id, this.user.id, fields);
  }
}

export default withController(GetById);