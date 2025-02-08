import jwt, { JwtPayload } from 'jsonwebtoken';

export async function decodeToken(value: string): Promise<JwtPayload | string> {
  const secret = process.env.JWT_SECRET!

  if (!secret) {
    throw Error('Secrets not found (security.ts - decryptHash)');
  }

  return jwt.verify(value, secret);
}

export async function generateToken(user: { provider_id: string, email: string }): Promise<string> {
  const secret = process.env.JWT_SECRET!

  if (!secret)
    throw Error('Secret not found (security.ts - generateToken)');

  return jwt.sign(
    { userId: user.provider_id, email: user.email, createdAt: new Date() },
    secret,
    {
      expiresIn: '24h',
    }
  );
}