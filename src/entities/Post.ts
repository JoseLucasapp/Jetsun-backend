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

  async agree(postId: string, userId: string): Promise<void> {
    await this.checkInteract(postId, userId, 'agree');
  }

  async disagree(postId: string, userId: string): Promise<void> {
    await this.checkInteract(postId, userId, 'disagree');
  }

  async getPosts(userId: string): Promise<PostInterface[]> {
    const posts = await PostModel.find({ userId }).select(
      'title text agree disagree',
    );

    return posts;
  }

  async checkInteract(
    postId: string,
    userId: string,
    interactType: string,
  ): Promise<void> {
    const userInteract = await PostModel.findOne({
      _id: postId,
      'interacts.userId': userId,
    }).select('interacts');
    const userInteractAgree = await PostModel.findOne({
      _id: postId,
      'interacts.userId': userId,
      'interacts.action': 'agree',
    }).select('interacts');
    const userInteractDisagree = await PostModel.findOne({
      _id: postId,
      'interacts.userId': userId,
      'interacts.action': 'disagree',
    }).select('interacts');

    if (interactType === 'agree') {
      if (userInteract) {
        if (userInteractAgree) {
          await this.removeInteract(postId, userId);
          await this.addOrRemoveAgree(postId, -1);
        }

        if (userInteractDisagree) {
          await this.removeInteract(postId, userId);
          await this.addOrRemoveDisagree(postId, -1);
          await this.addOrRemoveAgree(postId, 1);
          await this.addInteract(postId, userId, interactType);
        }
      }
      if (!userInteract) {
        await this.addInteract(postId, userId, interactType);
        await this.addOrRemoveAgree(postId, 1);
      }
    }

    if (interactType === 'disagree') {
      if (userInteract) {
        if (userInteractAgree) {
          await this.removeInteract(postId, userId);
          await this.addOrRemoveAgree(postId, -1);
          await this.addOrRemoveDisagree(postId, 1);
          await this.addInteract(postId, userId, interactType);
        }

        if (userInteractDisagree) {
          await this.removeInteract(postId, userId);
          await this.addOrRemoveDisagree(postId, -1);
        }
      }
      if (!userInteract) {
        await this.addInteract(postId, userId, interactType);
        await this.addOrRemoveDisagree(postId, 1);
      }
    }
  }

  async addOrRemoveAgree(postId: string, value: number): Promise<void> {
    await PostModel.updateOne({ _id: postId }, { $inc: { agree: value } }).exec(
      (err) => {
        if (err) throw err;
      },
    );
  }

  async addOrRemoveDisagree(postId: string, value: number): Promise<void> {
    await PostModel.updateOne(
      { _id: postId },
      { $inc: { disagree: value } },
    ).exec((err) => {
      if (err) throw err;
    });
  }

  async addInteract(
    postId: string,
    userId: string,
    interactType: string,
  ): Promise<void> {
    await PostModel.updateOne(
      { _id: postId },
      { $push: { interacts: { userId: userId, action: interactType } } },
    ).exec((err) => {
      if (err) throw err;
    });
  }

  async removeInteract(postId: string, userId: string): Promise<void> {
    await PostModel.updateOne(
      { _id: postId },
      { $pull: { interacts: { userId: userId } } },
    ).exec((err) => {
      if (err) throw err;
    });
  }
}
