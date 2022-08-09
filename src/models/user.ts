import { UserInterface } from 'interfaces/UserInterface';
import mongoose from 'mongoose';
import crypto from 'crypto';

const UserModel = new mongoose.Schema<UserInterface>({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    set: (value: string) =>
      crypto.createHash('md5').update(value).digest('hex'),
  },
  phrase: {
    type: String,
  },
});

const Model = mongoose.model<UserInterface>('users', UserModel);

export default Model;
