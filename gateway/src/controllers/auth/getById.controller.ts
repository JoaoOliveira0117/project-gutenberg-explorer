import withController from "../../utils/withController.js";
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
    const service = this.AuthService;

    return service.getUserById(id, this.token);
  }
}

export default withController(GetByIdController);