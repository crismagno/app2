import { EColorChoose } from "../../../components/WormBox";

export interface IWormState {
  text: string;
  show: boolean;
  colorChoose: EColorChoose;
}
export interface IUserRoom {
  userId: string;
  username: string;
  room: string;
  socketID: string;
  avatar?: string;
  userColor?: string;
}
