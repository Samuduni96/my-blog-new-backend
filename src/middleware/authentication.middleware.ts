import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  const secretKey = process.env.SECRET_KEY as Secret;

  jwt.verify(token, secretKey, (err, decodedUser) => {
    if (err) return res.sendStatus(403);

    // Assuming the decoded user contains a property like 'username'
    req.user = decodedUser as User;
    next();
  });
};
