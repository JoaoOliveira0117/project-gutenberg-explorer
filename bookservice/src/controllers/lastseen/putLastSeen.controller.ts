import withController from "../../utils/withController.js";
import LastSeenController from "./lastseen.controller.js";

/**
 * @openapi
 * /api/{user_id}/books/{book_id}/last-seen:
 *  put:
 *    tags: [Books]
 *    summary: Update last seen books by user
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: User id
 *      - in: path
 *        name: id
 *        required: true
 *        description: Book id
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class PostLastSeenBook extends LastSeenController {
  async handle() {
    const { user_id, book_id } = this.params as { user_id: string, book_id: string };

    const service = await this.service

    return service.addLastSeen({ user_id, book_id });
  }
}

export default withController(PostLastSeenBook);