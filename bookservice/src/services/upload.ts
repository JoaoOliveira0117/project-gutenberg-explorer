import BucketBase from "../http/bucket.js";

export default class UploadService {
  private bucket;

  constructor() {
    this.bucket = new BucketBase();
  }

  async fileExists(filename: string) {
    return this.bucket.fileExists(filename);
  }

  async uploadFile(filename: string, stream: ReadableStream<any>) {
    return this.bucket.streamFileFromWeb(filename, stream);
  }

  async getFileUrl(filename: string) {
    return this.bucket.getFileUrl(filename);
  }
}