import { UserInterface } from './UserInterface';

export interface UserProtocol {
  createUser(user: UserInterface): Promise<string>;
  updateUser(user: UserInterface, userId: string): Promise<string>;
  deleteUser(userId: string): Promise<string>;
  getUser(userId: string): Promise<UserInterface | string>;
  getAllUsers(username?: string): Promise<UserInterface[]>;
  login(
    username: string,
    password: string,
  ): Promise<{ user: UserInterface; token: string } | string>;
}
