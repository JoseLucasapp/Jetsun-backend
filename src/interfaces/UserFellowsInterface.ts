import mongoose from 'mongoose';
import { FellowInterface } from './FellowInterface';

export interface UserFellowsInterface {
  userId: mongoose.Types.ObjectId;
  fellows: [FellowInterface];
}
