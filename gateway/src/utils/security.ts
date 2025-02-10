import jwt, { JwtPayload } from 'jsonwebtoken';
import Secrets from '../config/secrets.js';

export async function decodeToken(value: string): Promise<JwtPayload | string> {
  const secrets = await Secrets.initialize();

  if (!secrets)
    throw Error('Secrets not found (security.ts - generateToken)');

  return jwt.verify(value, secrets.getSecret("JWT_SECRET"));
}

export async function generateToken(user: { provider_id: string, email: string }): Promise<string> {
  const secrets = await Secrets.initialize();

  if (!secrets)
    throw Error('Secrets not found (security.ts - generateToken)');

  return jwt.sign(
    { userId: user.provider_id, email: user.email, createdAt: new Date() },
    secrets.getSecret("JWT_SECRET"),
    {
      expiresIn: '24h',
    }
  );
}