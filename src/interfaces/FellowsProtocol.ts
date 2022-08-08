import mongoose from 'mongoose';
import { FellowInterface } from './FellowInterface';
import { UserFellowsInterface } from './UserFellowsInterface';

export interface FellowsProtocol {
  updateUserFellows(
    userId: mongoose.Types.ObjectId,
    fellow: FellowInterface,
  ): Promise<void>;
  getFellows(
    userId: mongoose.Types.ObjectId,
  ): Promise<UserFellowsInterface | null>;
  addNewFellow(
    userId: mongoose.Types.ObjectId,
    fellow: FellowInterface,
  ): Promise<void>;
  removeFellow(
    userId: mongoose.Types.ObjectId,
    fellow: FellowInterface,
  ): Promise<void>;
}
