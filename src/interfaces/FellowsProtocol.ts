import mongoose from 'mongoose';
import { FellowInterface } from './FellowInterface';
import { UserFellowsInterface } from './UserFellowsInterface';

export interface FellowsProtocol {
  updateUserFellows(userId: string, fellow: FellowInterface): Promise<string>;
  getFellows(userId: string): Promise<UserFellowsInterface | null>;
  addNewFellow(userId: string, fellow: FellowInterface): Promise<void>;
  removeFellow(userId: string, fellowUsername: string): Promise<string>;
}
