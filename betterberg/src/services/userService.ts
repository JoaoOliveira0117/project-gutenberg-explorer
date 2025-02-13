import ApiService from "@/http/apiService";
import Cookies from "@/http/cookies";
import { NextResponse } from "next/server";

export default class UserService extends ApiService {
  protected static instance: UserService;

  protected isAuthorized(): boolean {
    return this.cookies.getValue("token") !== undefined;
  }

  protected static async initialize() {
    const cookies = await Cookies.getInstance();
    return new UserService(cookies);
  }

  public static async getInstance() {
    if (!UserService.instance) {
      UserService.instance = await UserService.initialize();
    }

    return UserService.instance;
  }

  getUserMe(headers?: { [key: string]: string }) {
    return this.get("/api/user/me", {
      headers: headers
    });
  }

  logout() {
    this.cookies.deleteValue("token")
    NextResponse.redirect("/login");
  }
}