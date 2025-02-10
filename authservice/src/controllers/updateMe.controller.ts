import withController from "../utils/withController.js";
import AuthController from "./auth.controller.js";

/**
 * @openapi
 * /api/user/me:
 *  get:
 *    tags: [User]
 *    summary: Get current user details
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              profile_pic:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class UpdateMeController extends AuthController {
  async handle() {   
    const service = await this.UserService;

    return service.updateUserById(this.user.id, this.body);
  }
}

export default withController(UpdateMeController);