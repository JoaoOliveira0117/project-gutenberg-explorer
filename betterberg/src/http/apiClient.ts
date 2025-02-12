import { NextResponse } from "next/server";
import HttpError from "./error";

export default class ApiClient {
  private client;
  private baseUrl;
  private accessToken: string | undefined;
  private serviceName: string;

  constructor(baseUrl: string, accessToken?: string, serviceName = "API") {
    this.client = fetch;
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.serviceName = serviceName;
  }

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}`} : {}),
    };
  }

  private getBody(body: any) {
    return Object.keys(body).length > 0 ? { body: JSON.stringify(body) } : {};
  }

  private async call(endpoint: string, body: any, options: RequestInit = {}) {
    try {
      const url = this.getUrl(endpoint);
      const parsedBody = this.getBody(body);
      const response = await this.client(url, {
        method: "GET",
        headers: this.getHeaders(),
        ...options,
        ...parsedBody,
      });

      if (!response.ok) {
        if (response.headers.get("content-type")?.includes("application/json")) {
          const resBody = await response.json()
          throw new HttpError(
            resBody.message,
            this.serviceName + " Error",
            resBody.error.formatted,
            resBody.error.raw,
            resBody.status,
          )
        }
      
        throw new HttpError(
          "Failed to fetch data",
          this.serviceName + " Error"
        )
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  public async get(endpoint: string, options: RequestInit = {}) {
    return this.call(endpoint, options);
  }

  public async post(endpoint: string, body: any, options: RequestInit = {}) {
    return this.call(endpoint, body, { ...options, method: "POST" });
  }

  public async put(endpoint: string, body: any, options: RequestInit = {}) {
    return this.call(endpoint, body, { ...options, method: "PUT" });
  }

  public async delete(url: string, options: RequestInit = {}) {
    return this.client(url, { ...options, method: "DELETE" });
  }
}