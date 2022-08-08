import { UserFellowsInterface } from 'interfaces/UserFellowsInterface';
import { FellowsProtocol } from 'interfaces/FellowsProtocol';
import { Types } from 'mongoose';
import FellowsModel from '../models/fellows';
import { FellowInterface } from 'interfaces/FellowInterface';

export class Fellows implements FellowsProtocol {
  constructor() {}

  async getFellows(
    userId: Types.ObjectId,
  ): Promise<UserFellowsInterface | null> {
    const userFellows = await FellowsModel.findOne({ userId });

    return userFellows;
  }

  async updateUserFellows(
    userId: Types.ObjectId,
    fellow: FellowInterface,
  ): Promise<void> {
    const getUserFellows = await this.getFellows(userId);

    if (getUserFellows) {
      await this.addNewFellow(userId, fellow);
    }
    if (!getUserFellows) {
      const userFellows = new FellowsModel({ userId, fellows: [fellow] });
      await userFellows.save();
    }
  }

  async addNewFellow(
    userId: Types.ObjectId,
    fellow: FellowInterface,
  ): Promise<void> {
    await FellowsModel.updateOne(
      { userId },
      { $push: { fellows: fellow } },
    ).exec((err) => {
      if (err) throw err;
    });
  }

  async removeFellow(
    userId: Types.ObjectId,
    fellow: FellowInterface,
  ): Promise<void> {
    await FellowsModel.updateOne(
      { userId },
      { $pull: { fellows: { id: fellow._id } } },
    ).exec((err) => {
      if (err) throw err;
    });
  }
}
