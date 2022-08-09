import { Types } from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface';
import { UserProtocol } from '../interfaces/UserProtocol';

import { generateToken } from '../helpers/jwt';

import UserModel from '../models/user';

export class User implements UserProtocol {
  constructor() {}

  async createUser(user: UserInterface): Promise<string> {
    const username = await UserModel.findOne({
      username: user.username,
    }).select('username');

    if (username) return 'Username already exists';

    const newUser = new UserModel(user);
    await newUser.save();
    return 'User created';
  }

  async updateUser(user: UserInterface, userId: string): Promise<string> {
    await UserModel.updateOne({ _id: userId }, { $set: user }).exec((err) => {
      if (err) throw err;
    });

    return 'User updated';
  }

  async deleteUser(userId: string): Promise<string> {
    await UserModel.deleteOne({ _id: userId }).exec((err) => {
      if (err) throw err;
    });

    return 'User deleted';
  }

  async getUser(userId: string): Promise<UserInterface | string> {
    const userData = await UserModel.findOne({ _id: userId }).select(
      'id username phrase',
    );

    if (!userData) {
      return 'Not found';
    }

    return userData;
  }

  async getAllUsers(username?: string): Promise<UserInterface[]> {
    const filter = {};
    if (username) Object.assign(filter, { $regex: username, $options: 'i' });
    const allUsers = await UserModel.find(filter).select('id username');

    return allUsers;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ user: UserInterface; token: string } | string> {
    const userData = await UserModel.findOne({ username, password }).lean();

    if (!userData) return 'Credenciais inválidas';
    const token = generateToken({
      id: userData?._id,
      username: userData?.username,
    });
    return { user: userData, token };
  }
}
