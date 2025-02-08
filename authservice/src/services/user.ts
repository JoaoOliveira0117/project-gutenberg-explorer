import db from "../config/db.js";
import ProviderRepository from "../repositories/provider.repository.js";
import UserRepository from "../repositories/user.repository.js";

export default class UserService {
  protected userRepository;
  protected providerRepository;

  private constructor(db: any) {
    this.userRepository = new UserRepository(db);
    this.providerRepository = new ProviderRepository(db);
  }

  static async init() {
    const database = await db();

    return new UserService(database);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async findUserById(email: string) {
    return this.userRepository.findUserById(email);
  }

  async oauth(providerId: string, user: { email: string }) {
    const userRecord = await this.userRepository.findUserByEmail(user.email);

    if (!userRecord) {
      const newUser = await this.userRepository.createUser({ email: user.email });
      await this.providerRepository.createProvider({ provider_id: providerId, user_id: newUser.id });

      return newUser;
    }

    const providerRecord = await this.providerRepository.findProvider({ provider_id: providerId, user_id: userRecord.id});

    if (!providerRecord) {
      await this.providerRepository.createProvider({ provider_id: providerId, user_id: userRecord.id });
    }

    return userRecord;
  }
}