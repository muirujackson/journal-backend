import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { createUser, findUserByEmail, User } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await createUser({ ...user, password: hashedPassword });
  return newUser;
};

export const login = async (email: string, password: string, res: Response) => {
  const user = await findUserByEmail(email);
  
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // Set cookie with JWT token
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000 * 24 * 7, // 7 days in milliseconds
    //secure: process.env.NODE_ENV === 'production', set to true in production
    sameSite: 'strict', // enforce same-site cookie policy
  });
  console.log(user);
  return user;
};
