import mongoose from 'mongoose';

export interface UserInterface {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  phrase: string;
}
