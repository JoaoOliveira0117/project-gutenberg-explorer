import got from 'got';

export default class Service {
  protected baseUrl;
  protected client;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = got.extend({
      prefixUrl: baseUrl,
      responseType: 'json'
    });
  }
}