import { VerifyCallback } from 'jsonwebtoken';
import { Strategy, Profile } from 'passport-google-oauth20';
import Secrets from '../secrets.js';

export type GoogleUser = {
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}

export class GoogleStrategy extends Strategy {
  private constructor(clientId: string, clientSecret: string, apiUrl: string) {
    super({
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: `${apiUrl}/api/google/callback`,
      scope: ['profile', 'email']
    }, GoogleStrategy.handle);
  }

  private static async handle(accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) {
    cb(null, {
      accessToken,
      refreshToken,
      profile
    });
  }

  public static async initialize() {
    const secrets = await Secrets.initialize()

    const clientId = secrets.getSecret("GOOGLE_AUTH_CLIENT_ID");
    const clientSecret = secrets.getSecret("GOOGLE_AUTH_CLIENT_SECRET");
    const apiUrl = secrets.getSecret("API_URL");
    return new GoogleStrategy(clientId, clientSecret, apiUrl);
  }
}