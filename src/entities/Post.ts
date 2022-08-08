import { PostInterface } from 'interfaces/PostInterface';
import { PostProtocol } from 'interfaces/PostProtocol';
import { Types } from 'mongoose';

import PostModel from '../models/post';

export class Post implements PostProtocol {
  constructor() {}

  async addPost(post: PostInterface): Promise<void> {
    const newPost = new PostModel(post);

    await newPost.save();
  }

  async deletePost(postId: Types.ObjectId): Promise<void> {
    await PostModel.deleteOne({ _id: postId }).exec((err) => {
      if (err) throw err;
    });
  }

  async agree(postId: Types.ObjectId): Promise<void> {
    await PostModel.updateOne({ _id: postId }, { $inc: { agree: 1 } }).exec(
      (err) => {
        if (err) throw err;
      },
    );
  }

  async disagree(postId: Types.ObjectId): Promise<void> {
    await PostModel.updateOne({ _id: postId }, { $inc: { disagree: 1 } }).exec(
      (err) => {
        if (err) throw err;
      },
    );
  }

  async getPosts(userId: Types.ObjectId): Promise<PostInterface[]> {
    const posts = await PostModel.find({ userId });

    return posts;
  }
}
