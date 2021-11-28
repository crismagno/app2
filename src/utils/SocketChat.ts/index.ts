import io, { Socket } from "socket.io-client";
import { IMessage } from "../../components/Chat/RenderMessages";

let socket: Socket = null;
export class SocketChat {
  constructor() {}

  public async start(): Promise<Socket> | never {
    try {
      socket = io(process.env.NEXT_PUBLIC_URL_SOCKET_IO, {
        transports: ["websocket"],
        forceNew: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 10000,
        reconnection: true,
        multiplex: false,
      });

      return socket;
    } catch (error) {
      throw error;
    }
  }

  public disconnect(): void {
    socket?.disconnect();
  }

  public emitNewMessage(message: IMessage): void | never {
    try {
      if (socket?.connected) {
        socket?.emit("emitNewMessage", message);
      } else {
        throw "Connection error[1]";
      }
    } catch (error) {
      throw error;
    }
  }

  public emitRemoveMessage(message: IMessage): void | never {
    try {
      if (socket?.connected) {
        socket?.emit("emitRemoveMessage", message);
      } else {
        throw "Connection error[2]";
      }
    } catch (error) {
      throw error;
    }
  }
}
