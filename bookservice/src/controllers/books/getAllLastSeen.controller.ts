import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

/**
 * @openapi
 * /api/{user_id}/books/last-seen:
 *  get:
 *    tags: [Books]
 *    summary: Get all last seen books
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: User id
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
class GetAllLastSeenBooks extends BooksController {
  async handle() {
    const { fields } = this.query as { fields: string };
    const { user_id } = this.params;

    const service = await this.service

    return service.findAllLastSeenBooks(user_id, fields);
  }
}

export default withController(GetAllLastSeenBooks);