import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

/**
 * @openapi
 * /api/{user_id}/books:
 *  get:
 *    tags: [Books]
 *    summary: Get all books
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: User id
 *      - in: query
 *        name: search
 *        type: string
 *      - in: query
 *        name: fields
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *      - in: query
 *        name: page
 *        type: string
 *      - in: query
 *        name: pageSize
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class GetAllBooks extends BooksController {
  async handle() {
    const { search, fields } = this.query as { search: string, fields: string, user_id: string };
    const { user_id } = this.params;
    const { skip = 0, take = 25 } = this.getPagination();

    const service = await this.service

    return service.findAllBooks(user_id, fields, search, skip, take);
  }
}

export default withController(GetAllBooks);