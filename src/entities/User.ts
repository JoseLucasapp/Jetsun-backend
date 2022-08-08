import { Types } from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface';
import { UserProtocol } from '../interfaces/UserProtocol';

import UserModel from '../models/user';

export class User implements UserProtocol {
  constructor() {}

  async createUser(user: UserInterface): Promise<void> {
    const newUser = new UserModel(user);
    await newUser.save();
  }

  async updateUser(user: UserInterface, userId: Types.ObjectId): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { $set: user }).exec((err) => {
      if (err) throw err;
    });
  }

  async deleteUser(userId: Types.ObjectId): Promise<void> {
    await UserModel.deleteOne({ _id: userId }).exec((err) => {
      if (err) throw err;
    });
  }

  async getUser(userId: Types.ObjectId): Promise<UserInterface | null> {
    const userData = await UserModel.findOne({ _id: userId });

    return userData;
  }

  async getAllUsers(username?: string): Promise<UserInterface[]> {
    const allUsers = await UserModel.find({ username });

    return allUsers;
  }
}
