import { Types } from 'mongoose';

export interface AuthInterface {
  id: Types.ObjectId;
  username: string;
}
