import bcrypt from 'bcrypt';
import UserModel from '../models/User';

export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    // Check if email exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    return { email: user.email };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
