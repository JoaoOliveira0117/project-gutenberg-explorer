import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

/**
 * @openapi
 * /api/{user_id}/books/{id}:
 *  get:
 *    tags: [Books]
 *    summary: Get all last seen books
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: User id
 *      - in: path
 *        name: id
 *        required: true
 *        description: Book id
 *      - in: query
 *        name: fields
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class GetById extends BooksController {
  async handle() {
    const { fields } = this.query as { fields: string, user_id: string };
    const { id, user_id } = this.params;

    const service = await this.service;

    const book = await service.findBookById(id, user_id, fields);

    if (!book.book_url) {
      const fileUrl = await service.findOrUploadBook(id);

      return service.updateBookById(user_id, id, { book_url: fileUrl }, fields);
    }

    return book;
  }
}

export default withController(GetById);