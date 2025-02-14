import ApiClient from "./apiClient";
import Service from "./service";

export default class ApiService extends Service {
  private client: ApiClient;

  constructor() {
    super()
    this.client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);
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