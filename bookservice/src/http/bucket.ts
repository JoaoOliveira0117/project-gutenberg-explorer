import { Readable } from "node:stream";
import BucketConfig from "../config/bucket.config.js";

export default class BucketBase {
  private client;
  private bucketName;

  constructor() {
    this.client = BucketConfig.getInstance().getClient();
    this.bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME!;
  }

  getFileUrl(filename: string) {
    return `https://storage.googleapis.com/${this.bucketName}/books/${filename}`;
  }

  async fileExists(filename: string) {
    const bucket = this.client.bucket(this.bucketName);
    const file = bucket.file(`books/${filename}`);
    const [exists] = await file.exists()

    return exists;
  }

  async streamFileFromWeb(filename: string, stream: ReadableStream<any>) {
    const bucket = this.client.bucket(this.bucketName);
    const file = bucket.file(`books/${filename}`);

    const writeStream = file.createWriteStream();
    const nodeStream = Readable.fromWeb(stream as any);
    nodeStream.pipe(writeStream);
    
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    await file.makePublic()

    return this.getFileUrl(file.name);
  }
}