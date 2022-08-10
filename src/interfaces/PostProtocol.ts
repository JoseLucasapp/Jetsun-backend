import { PostInterface } from './PostInterface';

export interface PostProtocol {
  addPost(userId: string, post: PostInterface): Promise<string>;
  deletePost(postId: string): Promise<string>;
  agree(postId: string, userId: string): Promise<void>;
  disagree(postId: string, userId: string): Promise<void>;
  getPosts(userId: string): Promise<PostInterface[]>;
  checkInteract(
    postId: string,
    userId: string,
    interactType: string,
  ): Promise<void>;
  addOrRemoveAgree(postId: string, value: number): Promise<void>;
  addOrRemoveDisagree(postId: string, value: number): Promise<void>;

  addInteract(
    postId: string,
    userId: string,
    interactType: string,
  ): Promise<void>;
  removeInteract(postId: string, userId: string): Promise<void>;
}
