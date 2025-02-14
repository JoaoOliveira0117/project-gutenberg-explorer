import ApiService from "@/http/apiService";
import Cookies from "@/http/cookies";

export default class UserService extends ApiService {
  protected static instance: UserService;

  protected isAuthorized(): boolean {
    return this.cookies.getValue("token") !== undefined;
  }

  protected static async initialize() {
    const cookies = await Cookies.initialize();
    return new UserService(cookies);
  }

  public static async getInstance() {
    if (!UserService.instance) {
      UserService.instance = await UserService.initialize();
    }

    return UserService.instance;
  }

  getUserByToken(headers?: { [key: string]: any }) {
    return this.get("/api/user/me", headers);
  }

  getUserMe() {
    return this.get("/api/user/me");
  }

  logout() {
    this.cookies.deleteValue("token");
  }
}