import db from "../config/db.js";
import LastSeenRepository, { LastSeenRequest } from "../repositories/lastSeen.repository.js";

export default class LastSeenService {
  protected repository;

  private constructor(repository: LastSeenRepository) {
    this.repository = repository;
  }

  static async init() {
    const lastSeenRepository = await LastSeenRepository.init();
    return new LastSeenService(lastSeenRepository);
  }

  async addLastSeen(lastSeen: LastSeenRequest) {
    return this.repository.addLastSeen(lastSeen);
  }
}