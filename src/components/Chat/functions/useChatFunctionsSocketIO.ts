import { useEffect, useRef, useState } from "react";
import { generateColor, generateRandom } from "../../../utils/helpers";
import { IMessage } from "../RenderMessages";
import { IWormBoxProps } from "../../General/WormBox";
import { IUseChatFunctions, IWormState } from "./types";
import { Socket } from "socket.io-client";
import { IChatScrollPosition } from "../types";
import { SocketChat } from "../../../utils/SocketChat.ts";

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
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [removedMessages, setRemovedMessages] = useState<Array<IMessage>>([]);
  const [isDragMessage, setIsDragMessage] = useState(false);
  const [isDragOverRemove, setIsDragOverRemove] = useState(false);
  const [isVisiblePicker, setIsVisiblePicker] = useState(false);
  const [hoverRemoveAllMessages, setHoverRemoveAllMessages] = useState(false);
  const [isMouseEnterDivMain, setIsMouseEnterDivMain] = useState(true);
  const [positionScrollChatMessages, setPositionScrollChatMessages] =
    useState<IChatScrollPosition>(null);
  const chatMessagesRef = useRef(null);
  const socketChat = new SocketChat();

  useEffect(() => {
    if (router.query.id) {
      setUserName(String(router?.query?.userName));
      socketChat
        .start()
        .then(socketOn)
        .catch((error) => wormBoxAction(error, "danger", 2000));
      return () => {
        socketChat.disconnect();
      };
    }
  }, [router.query.id]);

  // listening all socket on
  const socketOn = (socket: Socket) => {
    socket?.on("connect", () => {
      wormBoxAction("Connected...", "success");
    });

    socket?.on("disconnect", () => {
      wormBoxAction("Disconnected!!!", "danger");
    });

    socket?.on("onNewMessage", (data: IMessage) => {
      if (data.chatId == router.query.id) {
        addChatMessages(data);
        scrollToDown();
      }
    });

    socket?.on("onRemoveMessage", (data: IMessage) => {
      if (data.chatId == router.query.id) {
        addChatRemovedMessages(data);
        removeMessage(data.id);
      }
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
        chatId: router.query.id,
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
  const removeMessageInvoke = async (message: IMessage) => {
    try {
      if (!message.id) {
        return wormBoxAction("Empty message!");
      }
      socketChat.emitNewMessage(message);
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
  };
};
