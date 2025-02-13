import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetById extends BooksController {
  async handle() {
    const { id } = this.params;
    console.log(id)
    return this.service.summarizeBook(id, this.user.id);
  }
}

export default withController(GetById);