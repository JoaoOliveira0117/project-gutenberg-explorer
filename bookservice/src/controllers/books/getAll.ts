import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetAllBooks extends BooksController {
  async handle() {
    const { search } = this.query;
    const { skip = 0, take = 25 } = this.getPagination();

    let result = this.service.select("id,book_id,title,authors,issue_date,created_at").range(skip, skip + take)

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