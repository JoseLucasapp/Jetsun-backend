import { PostInterface } from '../interfaces/PostInterface';
import mongoose from 'mongoose';

const PostModel = new mongoose.Schema<PostInterface>({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  disagree: {
    type: Number,
  },
  agree: {
    type: Number,
  },
  interacts: [{ userId: String, action: String }],
  publishedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Model = mongoose.model<PostInterface>('posts', PostModel);

export default Model;
