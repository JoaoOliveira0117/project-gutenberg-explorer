import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetById extends BooksController {
  async handle() {
    const { fields } = this.query as { fields: string[] }
    const { id } = this.params;

    console.log(fields)

    const selectFields = fields?.length > 0 ? fields.join(",") : "*";

    return this.service.select(selectFields).eq('id', id).single();
  }
}

export default withController(GetById);