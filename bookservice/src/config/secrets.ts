import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

type SecretsType = {
  DB_URL: string;
  DB_KEY: string;
  GOOGLE_AUTH_CLIENT_ID: string;
  GOOGLE_AUTH_CLIENT_SECRET: string;
  JWT_SECRET: string;
  APP_URL: string;
  API_URL: string;
  API_KEY: string;
  GROQ_API_KEY: string;
} 

export default class Secrets {
  private static instance: Secrets;
  private secrets;
  private client = null;

  private constructor(secrets: SecretsType) {
    this.secrets = secrets;
  }

  private static async initialize() {
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

  static async getInstance(): Promise<Secrets> {
    if (!this.instance) {
      this.instance = await Secrets.initialize();
    }

    return this.instance;
  }

  getSecret(name: keyof typeof this.secrets) {
    return this.secrets[name];
  }
}