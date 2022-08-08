import { PostInterface } from '../interfaces/PostInterface';
import mongoose from 'mongoose';

const PostModel = new mongoose.Schema({
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
  publishedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Model = mongoose.model<PostInterface>('posts', PostModel);

export default Model;
