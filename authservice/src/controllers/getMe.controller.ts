import withController from "../utils/withController.js";
import AuthController from "./auth.controller.js";

/**
 * @openapi
 * /api/user/me:
 *  get:
 *    tags: [User]
 *    summary: Get current user details
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class GetMeController extends AuthController {
  async handle() {   
    const service = this.UserService;

    return service.findUserByEmail(this.user.email);
  }
}

export default withController(GetMeController);