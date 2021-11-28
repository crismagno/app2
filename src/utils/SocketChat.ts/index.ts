import io, { Socket } from "socket.io-client";
import { IMessage } from "../../components/Chat/RenderMessages";

export class SocketChat {
  private static socket: Socket = null;

  constructor() {}

  public async start(): Promise<Socket> | never {
    try {
      SocketChat.socket = io(process.env.NEXT_PUBLIC_URL_SOCKET_IO, {
        transports: ["websocket"],
        forceNew: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 10000,
        reconnection: true,
        multiplex: false,
      });

      return SocketChat.socket;
    } catch (error) {
      throw error;
    }
  }

  public disconnect(): void {
    SocketChat.socket?.disconnect();
  }

  public emitNewMessage(message: IMessage): void | never {
    try {
      if (SocketChat.socket?.connected) {
        SocketChat.socket?.emit("emitNewMessage", message);
      } else {
        throw "Connection error[1]";
      }
    } catch (error) {
      throw error;
    }
  }

  public emitRemoveMessage(message: IMessage): void | never {
    try {
      if (SocketChat.socket?.connected) {
        SocketChat.socket?.emit("emitRemoveMessage", message);
      } else {
        throw "Connection error[2]";
      }
    } catch (error) {
      throw error;
    }
  }
}
