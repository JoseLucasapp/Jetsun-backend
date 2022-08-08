import mongoose from 'mongoose';

export interface UserInterface {
  _id: mongoose.Types.ObjectId;
  username: String;
  password: String;
  phrase: String;
}
