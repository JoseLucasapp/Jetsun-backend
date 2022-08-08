import { UserFellowsInterface } from 'interfaces/UserFellowsInterface';
import mongoose from 'mongoose';

const FellowsModel = new mongoose.Schema<UserFellowsInterface>({
  userId: mongoose.Types.ObjectId,
  fellows: [
    {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
  ],
});

const Model = mongoose.model<UserFellowsInterface>('users', FellowsModel);

export default Model;
