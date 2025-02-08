import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

type SecretsType = {
  DB_URL: string;
  DB_KEY: string;
  GOOGLE_AUTH_CLIENT_ID: string;
  GOOGLE_AUTH_CLIENT_SECRET: string;
  JWT_SECRET: string;
  APP_URL: string;
  API_URL: string;
} 

export default class Secrets {
  private secrets;

  private constructor(secrets: SecretsType) {
    this.secrets = secrets;
  }

  static async initialize() {
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${process.env.GCP_SECRETS_MANAGER}/versions/latest`,
    });

    const parsed = JSON.parse(version.payload!.data!.toString());
    return new Secrets({
      ...parsed,
      APP_URL: process.env.APP_URL,
      API_URL: process.env.API_URL,
    });
  }

  getSecret(name: keyof typeof this.secrets) {
    return this.secrets[name];
  }
}