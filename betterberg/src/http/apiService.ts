import { NextResponse } from "next/server";
import ApiClient from "./apiClient";
import Cookies from "./cookies";
import Service from "./service";

export default class ApiService extends Service {
  private client: ApiClient;

  protected constructor(cookies: Cookies) {
    super(cookies);

    if (!this.isAuthorized()) {
      NextResponse.redirect("/login");
      throw new Error("Unauthorized");
    }

    this.client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!, cookies.getValue("token"));
  }

  protected isAuthorized(): boolean {
    throw new Error("Method not implemented.");
  }

  protected async get(endpoint: string, options: RequestInit = {}) {
    return this.client.get(endpoint, options);
  }

  protected async post(endpoint: string, body: any, options: RequestInit = {}) {
    return this.client.post(endpoint, body, options);
  }

  protected async put(endpoint: string, body: any, options: RequestInit = {}) {
    return this.client.put(endpoint, body, options);
  }

  protected async delete(endpoint: string, options: RequestInit = {}) {
    return this.client.delete(endpoint, options);
  }
}