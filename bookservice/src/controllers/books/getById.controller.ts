import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetById extends BooksController {
  async handle() {
    const { fields } = this.query as { fields: string[], user_id: string };
    const { id, user_id } = this.params;

    const service = await this.service

    return service.findBookById(id, user_id, fields);
  }
}

export default withController(GetById);