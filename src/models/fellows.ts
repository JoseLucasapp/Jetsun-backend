import { UserFellowsInterface } from 'interfaces/UserFellowsInterface';
import mongoose from 'mongoose';

const FellowsModel = new mongoose.Schema<UserFellowsInterface>({
  userId: mongoose.Types.ObjectId,
  fellows: [
    {
      _id: String,
      username: String,
    },
  ],
});

const Model = mongoose.model<UserFellowsInterface>('userFellows', FellowsModel);

export default Model;
