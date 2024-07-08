import { Request, Response } from 'express';
import { register, login } from '../services/authService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password, res);
    console.log(user);
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};