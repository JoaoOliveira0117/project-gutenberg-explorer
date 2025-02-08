import withController from "../utils/withController.js";
import AuthController from "./auth.controller.js";

/**
 * @openapi
 * /api/user/{id}:
 *  get:
 *    tags: [User]
 *    summary: Get current user details
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User id
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class GetByIdController extends AuthController {
  async handle() {   
    const { id } = this.params;
    const service = this.UserService;

    return service.findUserById(id);
  }
}

export default withController(GetByIdController);