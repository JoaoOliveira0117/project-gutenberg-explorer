import got from 'got';
import Secrets from '../config/secrets.js';

export default class Service {
  protected baseUrl;
  protected client;
  private apiKeySecret: string = "";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = got.extend({
      prefixUrl: baseUrl,
      responseType: 'json'
    });
  }

  private async getApiKeySecret() {
    if (this.apiKeySecret) return this.apiKeySecret;
    this.apiKeySecret = (await Secrets.initialize()).getSecret('API_KEY');
    return this.apiKeySecret;
  }

  async getHeaders(token?: string) {
    const headers: Record<string, string> = {};

    if (token) headers.Authorization = token;
    headers['x-api-key'] = await this.getApiKeySecret();

    return headers;
  }
}