import { Storage } from "@google-cloud/storage";

export default class BucketConfig {
  private static instance: BucketConfig;
  private client;

  private constructor(client: Storage) {
    this.client = client;
  }

  private static initialize() {
    const client = process.env.GOOGLE_CREDENTIALS ? 
      new Storage({
        credentials: JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS!, "base64").toString("utf-8"))
      }) : 
      new Storage();

    return new BucketConfig(client);
  }

  static getInstance(): BucketConfig {
    if (!BucketConfig.instance) {
      BucketConfig.instance = BucketConfig.initialize();
    }
    return BucketConfig.instance;
  }

  getClient() {
    return this.client;
  }
}