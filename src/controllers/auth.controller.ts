import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await authService.registerUser(firstName, lastName, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await authService.loginUser(email, password);
    const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  // Perform any logout-related actions if needed
  res.json({ message: 'User logged out successfully' });
};
