import { ETypeChat } from "../../utils/interfaces";

export interface IRoomSaved {
  userName: string;
  room: string;
  avatar?: string;
  typeChat: ETypeChat;
  createdAt: Date;
}
