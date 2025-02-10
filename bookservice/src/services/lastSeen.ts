import db from "../config/db.js";
import LastSeenRepository, { LastSeenRequest } from "../repositories/lastSeen.repository.js";

export default class LastSeenService {
  protected repository;

  private constructor(db: any) {
    this.repository = new LastSeenRepository(db);
  }

  static async init() {
    const database = await db();

    return new LastSeenService(database);
  }

  async addLastSeen(lastSeen: LastSeenRequest) {
    return this.repository.addLastSeen(lastSeen);
  }
}