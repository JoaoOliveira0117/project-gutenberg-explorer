import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetById extends BooksController {
  async handle() {
    const { fields, user_id } = this.query as { fields: string[], user_id: string };
    const { id } = this.params;

    const selectFields = fields?.length > 0 ? fields.join(",") : "*";

    return this.service.select(selectFields).eq('id', id).single();
  }
}

export default withController(GetById);