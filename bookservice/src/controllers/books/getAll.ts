import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetAllBooks extends BooksController {
  async handle() {
    const { search, fields } = this.query as { search: string, fields: string[] };
    console.log(this.query)
    const { skip = 0, take = 25 } = this.getPagination();

    const selectFields = fields?.length > 0 ? fields.join(",") : "*";

    let result = this.service.select(selectFields).range(skip, skip + take)

    if ((search as string)?.trim()) {
      const conditions = [
        `title.ilike.%${search}%`,
      ];

      conditions.push(`tags.cs.{${search}}`);
      conditions.push(`subjects.cs.{${search}}`);

      if (!isNaN(Number(search))) {
        conditions.push(`id.eq.${search}`);
        conditions.push(`book_id.eq.${search}`);
      }

      result = result.or(conditions.join(","));
    }

    return result;
  }
}

export default withController(GetAllBooks);