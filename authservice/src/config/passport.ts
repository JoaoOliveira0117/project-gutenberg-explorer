import passport from "passport";
import { GoogleStrategy } from "./strategies/google.strategy.js";

export class Passport {
  static async initialize() {
    const googleStrategy = await GoogleStrategy.initialize();

    passport.use(googleStrategy);
  }
}