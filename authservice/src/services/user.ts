import ProviderRepository from "../repositories/provider.repository copy.js";
import UserRepository from "../repositories/user.repository.js";

export default class UserService {
  protected userRepository;
  protected providerRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.providerRepository = new ProviderRepository();
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