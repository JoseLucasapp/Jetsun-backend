import { FellowInterface } from './FellowInterface';

export interface UserFellowsInterface {
  userId: string;
  fellows: [FellowInterface];
}
