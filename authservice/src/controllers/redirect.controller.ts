import withController from "../utils/withController.js";
import AuthController from "./auth.controller.js";

/**
 * @openapi
 * /api/v1/auth/google/redirect:
 *  get:
 *    tags: [Auth]
 *    summary: Redirects user to Provider login page
 *    description: Redirects user to Provider login page. Unable to test this endpoint through Swagger UI.
 *    responses:
 *      200:
 *        description: Success
 *      302:
 *        description: Redirect
 *      400:
 *        description: Internal server error
 */
class RedirectController extends AuthController {
  async handle() {}

  async execute(): Promise<void> {}
}

export default withController(RedirectController);