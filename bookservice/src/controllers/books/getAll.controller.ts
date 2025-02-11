import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetAllBooks extends BooksController {
  async handle() {
    const { search, fields } = this.query as { search: string, fields: string, user_id: string };
    console.log(fields);
    const { user_id } = this.params;
    const { skip = 0, take = 25 } = this.getPagination();

    const service = await this.service

    return service.findAllBooks(user_id, fields, search, skip, take);
  }
}

export default withController(GetAllBooks);