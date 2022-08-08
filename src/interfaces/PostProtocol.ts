import mongoose from 'mongoose';
import { PostInterface } from './PostInterface';

export interface PostProtocol {
  addPost(post: PostInterface): Promise<void>;
  deletePost(postId: mongoose.Types.ObjectId): Promise<void>;
  agree(postId: mongoose.Types.ObjectId): Promise<void>;
  disagree(postId: mongoose.Types.ObjectId): Promise<void>;
  getPosts(userId: mongoose.Types.ObjectId): Promise<PostInterface[]>;
}
