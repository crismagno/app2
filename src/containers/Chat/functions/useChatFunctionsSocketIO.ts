import { useEffect, useRef, useState } from "react";
import { generateColor, generateRandom } from "../../../utils/helpers";
import { IMessage } from "../RenderMessages";
import { IWormBoxProps } from "../../../components/WormBox";
import { IUseChatFunctions, IUserRoom, IWormState } from "./types";
import { Socket } from "socket.io-client";
import { IChatScrollPosition } from "../types";
import { SocketChat } from "../../../utils/SocketChat.ts";
import { ISocketChatQuery } from "../../../utils/SocketChat.ts/types";
import { NextRouter } from "next/router";

const colorGenerate: string = generateColor();

export const useChatFunctionsSocketIO = ({ router }: IUseChatFunctions) => {
  const [wormState, setWormState] = useState<IWormState>({
    colorChoose: "white",
    show: false,
    text: "",
  });
  const [userId, setUserId] = useState<string>(`social_${generateRandom()}`);
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [removedMessages, setRemovedMessages] = useState<IMessage[]>([]);
  const [isDragMessage, setIsDragMessage] = useState(false);
  const [isDragOverRemove, setIsDragOverRemove] = useState(false);
  const [isVisiblePicker, setIsVisiblePicker] = useState(false);
  const [hoverRemoveAllMessages, setHoverRemoveAllMessages] = useState(false);
  const [isMouseEnterDivMain, setIsMouseEnterDivMain] = useState(true);
  const [usersRoom, setUsersRoom] = useState<IUserRoom[]>([]);
  const [positionScrollChatMessages, setPositionScrollChatMessages] =
    useState<IChatScrollPosition>(null);
  const chatMessagesRef = useRef(null);
  const socketChat = new SocketChat();

  useEffect(() => {
    if (router.query.id) {
      setUserName(String(router?.query?.userName));
      socketChat
        .start(querySocketChat(router))
        .then((socket) => socketOn(socket, String(router.query.id)))
        .catch((error) => wormBoxAction(error, "danger", 2000));
      return () => {
        socketChat.disconnect();
      };
    }
  }, [router]);

  const querySocketChat = (router: NextRouter): Partial<ISocketChatQuery> => ({
    userId: userId,
    username: String(router?.query?.userName),
    room: String(router.query.id),
    avatar: String(router?.query?.userAvatar),
    userColor: colorGenerate,
  });

  // listening all socket on
  const socketOn = (socket: Socket, room: string) => {
    socket?.on("connect", () => {
      wormBoxAction("Connected...", "success");
    });

    socket?.on("disconnect", () => {
      wormBoxAction("Disconnected!!!", "danger");
    });

    socket?.on(`userConnected-${room}`, (data: IUserRoom) => {
      if (data.userId !== userId) {
        setUsersRoom((usersRoom: IUserRoom[]): IUserRoom[] => [
          ...usersRoom,
          data,
        ]);
      }
    });

    socket?.on(`userDisconnected-${room}`, (data: IUserRoom) => {
      setUsersRoom((usersRoom: IUserRoom[]): IUserRoom[] =>
        usersRoom.filter(
          (userRoom: IUserRoom) => userRoom.userId !== data.userId
        )
      );
    });

    socket?.on(`userConnected-${userId}`, (data: IUserRoom[]) =>
      setUsersRoom(data)
    );

    socket?.on(`onNewMessage-${room}`, (data: IMessage) => {
      addChatMessages(data);
      scrollToDown();
    });

    socket?.on(`onRemoveMessage-${room}`, (data: IMessage) => {
      addChatRemovedMessages(data);
      removeMessage(data.id);
    });
  };

  // send message to socket
  const sendMessageInvoke = async () => {
    try {
      if (!message?.trim()) {
        return wormBoxAction("Empty message!");
      }
      socketChat.emitNewMessage({
        id: generateRandom(),
        userName,
        userId,
        room: router.query.id,
        message,
        createdAt: new Date().toISOString(),
        colorGenerate,
      });
      setMessage("");
      setIsVisiblePicker(false);
    } catch (error) {
      wormBoxAction(String(error), "warning");
    }
  };

  // send message to remove to socket
  const removeMessageInvoke = async (message: IMessage): Promise<void> => {
    try {
      if (!message.id) {
        wormBoxAction("Empty message!");
        return;
      }
      socketChat.emitRemoveMessage(message);
    } catch (error) {
      wormBoxAction(error, "warning");
    }
  };

  // add message on component
  const addChatMessages = (data: IMessage): void =>
    setMessages((messages) => [...messages, data]);

  // add message on messages removed by user component
  const addChatRemovedMessages = (data: IMessage): void =>
    setRemovedMessages((messages) => [...messages, data]);

  // remove message of messages of component
  const removeMessage = (id: IMessage["id"]) =>
    setMessages((messages) =>
      messages.filter((messageFilter) => messageFilter.id !== id)
    );

  // part of events components=======================
  const scrollToDown = () => {
    chatMessagesRef?.current.scroll(
      0,
      chatMessagesRef?.current.scrollHeight,
      "smooth"
    );
  };
  const scrollToTop = () => {
    chatMessagesRef?.current.scroll(0, 0, "smooth");
  };

  const onDragOverHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsDragOverRemove(true);
  };

  const onDragStartHandler = (event, messageElement: IMessage) => {
    setIsDragMessage(true);
    setIsVisiblePicker(false);
    event.dataTransfer.setData("text/plain", JSON.stringify(messageElement));
    event.dropEffect = "move";
  };

  const onDragEndHandler = (event) => {
    setIsDragMessage(false);
  };

  const onDropHandler = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const messageToRemove: IMessage = JSON.parse(data);
    removeMessageInvoke(messageToRemove);
    setIsDragMessage(false);
    setIsDragOverRemove(false);
  };

  const onDragDropLeaveHandler = (event) => {
    setIsDragOverRemove(false);
  };

  const onKeypress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessageInvoke();
    }
  };

  const onScrollChatMessages = (event) => {
    setPositionScrollChatMessages({
      scrollTop: event.target.scrollTop,
      clientHeight: event.target.clientHeight,
      scrollHeight: event.target.scrollHeight,
    });
  };

  const pickerOnClick = (emoji: any, event: any): void => {
    setMessage((text) => `${text}${emoji.native}`);
  };

  const wormBoxAction = (
    text: string,
    colorChoose: IWormBoxProps["colorChoose"] = "white",
    duration: number = 1000
  ): void => {
    setWormState({
      show: true,
      text,
      colorChoose,
    });

    setTimeout(() => {
      setWormState({
        text: "",
        show: false,
        colorChoose,
      });
    }, duration);
  };

  return {
    colorGenerate,
    router,
    wormState,
    userId,
    userName,
    message,
    setMessage,
    messages,
    setMessages,
    isDragMessage,
    setIsDragMessage,
    isDragOverRemove,
    setIsDragOverRemove,
    isVisiblePicker,
    setIsVisiblePicker,
    hoverRemoveAllMessages,
    setHoverRemoveAllMessages,
    positionScrollChatMessages,
    setPositionScrollChatMessages,
    chatMessagesRef,
    sendMessageInvoke,
    addChatMessages,
    removeMessageInvoke,
    removeMessage,
    scrollToDown,
    scrollToTop,
    onDragOverHandler,
    onDragStartHandler,
    onDragEndHandler,
    onDropHandler,
    onDragDropLeaveHandler,
    onKeypress,
    onScrollChatMessages,
    pickerOnClick,
    isMouseEnterDivMain,
    setIsMouseEnterDivMain,
    removedMessages,
    setRemovedMessages,
    usersRoom,
  };
};
