import { generateToken } from "../utils/security.js";
import withController from "../utils/withController.js";
import AuthController from "./auth.controller.js";
import { Profile as GoogleProfile } from "passport-google-oauth20";

/**
 * @openapi
 * /api/v1/auth/google/callback:
 *  get:
 *    tags: [Auth]
 *    summary: Redirects user to application after authentication
 *    parameters:
 *      - in: query
 *        name: code
 *        required: true
 *        description: Authorization code
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class CallbackController extends AuthController {
  private async googleCallback() {
    const { profile } = this.user as { profile: GoogleProfile };
    const service = this.UserService;
    
    const user = await service.oauth(profile.id,{
      email: profile._json.email!
    })

    return { provider_id: profile.id, email: profile._json.email! }
  }

  async handle() {
    const user = await this.googleCallback();

    const token = await generateToken(user);
    return token;
  }

  async execute(): Promise<void> {
    try {
      const token = await this.handle() || ''
      const appUrl = process.env.APP_URL

      this.res.redirect(`${appUrl}/?token=${token}`);
    } catch (error: unknown) {
      console.log(error)
      this.res.status(500).send({ error });
    }
  }
}

export default withController(CallbackController);