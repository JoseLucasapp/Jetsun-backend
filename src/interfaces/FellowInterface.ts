import mongoose from 'mongoose';

export interface FellowInterface {
  _id: mongoose.Types.ObjectId;
  username: string;
}
