import { NextRouter } from "next/router";
import { IWormBoxProps } from "../../../components/WormBox";

export interface IWormState {
  text: string;
  show: boolean;
  colorChoose: IWormBoxProps["colorChoose"];
}

export interface IUseChatFunctions {
  router: NextRouter;
}

export interface IUserRoom {
  userId: string;
  username: string;
  room: string;
  socketID: string;
  avatar?: string;
  userColor?: string;
}
