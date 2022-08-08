import mongoose from 'mongoose';
import { UserInterface } from './UserInterface';

export interface UserProtocol {
  createUser(user: UserInterface): void;
  updateUser(
    user: UserInterface,
    userId: mongoose.Types.ObjectId,
  ): Promise<void>;
  deleteUser(userId: mongoose.Types.ObjectId): Promise<void>;
  getUser(userId: mongoose.Types.ObjectId): Promise<UserInterface | null>;
  getAllUsers(username?: string): Promise<UserInterface[]>;
}
