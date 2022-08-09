import { PostInterface } from './PostInterface';

export interface PostProtocol {
  addPost(userId: string, post: PostInterface): Promise<string>;
  deletePost(postId: string): Promise<string>;
  agree(postId: string): Promise<void>;
  disagree(postId: string): Promise<void>;
  getPosts(userId: string): Promise<PostInterface[]>;
}
