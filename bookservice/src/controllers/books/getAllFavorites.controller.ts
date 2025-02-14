import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

/**
 * @openapi
 * /api/{user_id}/books/favorites:
 *  get:
 *    tags: [Books]
 *    summary: Get all favorite books
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
class GetAllFavoriteBooks extends BooksController {
  async handle() {
    const { fields } = this.query as { fields: string };
    const { user_id } = this.params;
    const { skip = 0, take = 25 } = this.getPagination();

    const service = await this.service

    return service.findAllFavoriteBooks(user_id, fields, skip, take);
  }
}

export default withController(GetAllFavoriteBooks);