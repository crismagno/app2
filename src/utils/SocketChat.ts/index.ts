import { Socket, Manager, io } from "socket.io-client";
import { IMessage } from "../../containers/Chat/RenderMessages";
import { ISocketChatQuery } from "./types";

export class SocketChat {
  private static _socket: Socket = null;

  public async start(
    query: Partial<ISocketChatQuery>
  ): Promise<Socket> | never {
    try {
      const manager = new Manager(process.env.NEXT_PUBLIC_URL_SOCKET_IO, {
        transports: ["websocket", "polling"],
        forceNew: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 10000,
        reconnection: true,
        multiplex: false,
        query,
      });

      SocketChat._socket = manager.socket(
        process.env.NEXT_PUBLIC_MANAGER_SOCKET_IO_PATH
      );

      return SocketChat._socket;
    } catch (error) {
      throw error;
    }
  }

  public disconnect(): void {
    SocketChat._socket?.disconnect();
  }

  public emitNewMessage(message: IMessage): void | never {
    try {
      if (SocketChat._socket?.connected) {
        SocketChat._socket?.emit("emitNewMessage", message);
      } else {
        throw "Connection error[1]";
      }
    } catch (error) {
      throw error;
    }
  }

  public emitRemoveMessage(message: IMessage): void | never {
    try {
      if (SocketChat._socket?.connected) {
        SocketChat._socket?.emit("emitRemoveMessage", message);
      } else {
        throw "Connection error[2]";
      }
    } catch (error) {
      throw error;
    }
  }
}
