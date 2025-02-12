import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetAllLastSeenBooks extends BooksController {
  async handle() {
    const { fields } = this.query as { search: string, fields: string, user_id: string };
    const { user_id } = this.params;
    const { skip = 0, take = 25 } = this.getPagination();

    const service = await this.service

    return service.findAllLastSeenBooks(user_id, fields, skip, take);
  }
}

export default withController(GetAllLastSeenBooks);