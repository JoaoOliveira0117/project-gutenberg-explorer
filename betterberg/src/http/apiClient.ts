import HttpError from "./error";
import { unstable_noStore } from "next/cache"

export default class ApiClient {
  private client;
  private baseUrl;
  private serviceName: string;

  constructor(baseUrl: string, serviceName = "API", overrideClient?: any) {
    this.client = overrideClient || fetch;
    this.baseUrl = baseUrl;
    this.serviceName = serviceName;
  }

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json"
    };
  }

  private getBody(body: any) {
    return Object.keys(body).length > 0 ? { body: JSON.stringify(body) } : {};
  }

  private async call(endpoint: string, body: any, options: RequestInit = {}) {
    unstable_noStore()
    try {
      const url = this.getUrl(endpoint);
      const parsedBody = this.getBody(body);

      const response = await this.client(url, {
        cache: "no-store",
        next: {
          revalidate: 0
        },
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
            resBody.error?.formatted || [],
            resBody.error?.raw || [],
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
    return this.call(endpoint, {}, options);
  }

  public async post(endpoint: string, body: any, options: RequestInit = {}) {
    return this.call(endpoint, body, { ...options, method: "POST" });
  }

  public async put(endpoint: string, body: any, options: RequestInit = {}) {
    return this.call(endpoint, body, { ...options, method: "PUT" });
  }

  public async delete(endpoint: string, options: RequestInit = {}) {
    return this.call(endpoint, {}, { ...options, method: "DELETE" });
  }
}