import { UserFellowsInterface } from 'interfaces/UserFellowsInterface';
import { FellowsProtocol } from 'interfaces/FellowsProtocol';
import { Types } from 'mongoose';
import FellowsModel from '../models/fellows';
import { FellowInterface } from 'interfaces/FellowInterface';

export class Fellows implements FellowsProtocol {
  constructor() {}

  async getFellows(userId: string): Promise<UserFellowsInterface | null> {
    const userFellows = await FellowsModel.findOne({ userId }).select(
      'userId fellows',
    );

    return userFellows;
  }

  async updateUserFellows(
    userId: string,
    fellow: FellowInterface,
  ): Promise<string> {
    const getUserFellows = await this.getFellows(userId);

    if (getUserFellows) {
      await this.addNewFellow(userId, fellow);
      return 'New fellow';
    }
    const userFellows = new FellowsModel({ userId, fellows: [fellow] });
    await userFellows.save();
    return 'New fellow';
  }

  async addNewFellow(userId: string, fellow: FellowInterface): Promise<void> {
    await FellowsModel.updateOne(
      { userId },
      { $push: { fellows: fellow } },
    ).exec((err) => {
      if (err) throw err;
    });
  }

  async removeFellow(userId: string, fellowUsername: string): Promise<string> {
    await FellowsModel.updateOne(
      { userId },
      { $pull: { fellows: { username: fellowUsername } } },
      { safe: true, multi: false },
    ).exec((err) => {
      if (err) throw err;
    });

    return 'Fellow removed';
  }
}
