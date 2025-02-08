import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetById extends BooksController {
  async handle() {
    const { fields } = this.query
    const { id } = this.params;
    return this.service.select(fields as string).eq('id', id).single();
  }
}

export default withController(GetById);