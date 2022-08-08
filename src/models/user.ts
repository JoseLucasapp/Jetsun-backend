import { UserInterface } from 'interfaces/UserInterface';
import mongoose from 'mongoose';

const UserModel = new mongoose.Schema<UserInterface>({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phrase: {
    type: String,
  },
});

const Model = mongoose.model<UserInterface>('users', UserModel);

export default Model;
