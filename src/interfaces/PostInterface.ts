import mongoose from 'mongoose';

export interface PostInterface {
  _id: mongoose.Types.ObjectId;
  title: string;
  text: string;
  publishedAt: Date;
  agree: number;
  disagree: number;
  userId: string;
}
