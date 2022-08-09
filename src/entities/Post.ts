import { PostInterface } from 'interfaces/PostInterface';
import { PostProtocol } from 'interfaces/PostProtocol';
import { Types } from 'mongoose';

import PostModel from '../models/post';

export class Post implements PostProtocol {
  constructor() {}

  async addPost(userId: string, post: PostInterface): Promise<string> {
    post.userId = userId;
    const newPost = new PostModel(post);

    await newPost.save();

    return `Post ${post.title} created`;
  }

  async deletePost(postId: string): Promise<string> {
    await PostModel.deleteOne({ _id: postId }).exec((err) => {
      if (err) throw err;
    });

    return 'Post deleted';
  }

  async agree(postId: string): Promise<void> {
    await PostModel.updateOne({ _id: postId }, { $inc: { agree: 1 } }).exec(
      (err) => {
        if (err) throw err;
      },
    );
  }

  async disagree(postId: string): Promise<void> {
    await PostModel.updateOne({ _id: postId }, { $inc: { disagree: 1 } }).exec(
      (err) => {
        if (err) throw err;
      },
    );
  }

  async getPosts(userId: string): Promise<PostInterface[]> {
    const posts = await PostModel.find({ userId }).select(
      'title text agree disagree',
    );

    return posts;
  }
}
