import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

type SecretsType = {
  API_KEY: string;
} 

export default class Secrets {
  private secrets;

  private constructor(secrets: SecretsType) {
    this.secrets = secrets;
  }

  static async initialize() {
    const client = process.env.GOOGLE_CREDENTIALS ? 
      new SecretManagerServiceClient({
        credentials: JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS!, "base64").toString("utf-8"))
      }) : 
      new SecretManagerServiceClient(); 
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