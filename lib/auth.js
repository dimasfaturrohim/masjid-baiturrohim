import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose'; // Use jose library instead of jsonwebtoken

const JWT_EXPIRES_IN = '7d';

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(user) {
  const { password, ...userWithoutPassword } = user;

  return jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export async function verifyToken(token) {
  try {
    // Use jose library which uses Web Crypto API
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}
