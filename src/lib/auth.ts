import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'hawk_motor_secret_jwt_key_2026_premium_garage';

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
}

// 1. Sign JWT Token
export function signToken(payload: AdminSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

// 2. Verify JWT Token
export function verifyToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch (error) {
    return null;
  }
}

// 3. Password Hashing Utilities
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
