import React, { useEffect, useRef, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { generateColor, generateRandom } from "../../../utils/helpers";
import { IMessage } from "../RenderMessages";
import { IWormBoxProps } from "../../General/WormBox";
import { IUseChatFunctions, IWormState } from "./types";

const colorGenerate = generateColor();

export const UseChatFunctions = ({ router }: IUseChatFunctions) => {
  const [hubConnectionChat, setHubConnectionChat] = useState<
    HubConnection | any
  >();
  const [wormState, setWormState] = useState<IWormState>({
    colorChoose: "white",
    show: false,
    text: "",
  });
  const [userId, setUserId] = useState<string>(`social_${generateRandom()}`);
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [isDragMessage, setIsDragMessage] = useState(false);
  const [isDragOverRemove, setIsDragOverRemove] = useState(false);
  const [isVisiblePicker, setIsVisiblePicker] = useState(false);
  const [hoverRemoveAllMessages, setHoverRemoveAllMessages] = useState(false);
  const [positionScrollChatMessages, setPositionScrollChatMessages] = useState<{
    scrollTop: any;
    clientHeight: any;
    scrollHeight: any;
  }>(null);
  const chatMessagesRef = useRef(null);
  let connection: HubConnection;

  useEffect(() => {
    if (router.query.id) {
      connection = new HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_URL_SIGNALR}chathub`)
        .configureLogging(LogLevel.Information)
        .build();

      connection
        .start()
        .then((resp) => console.log("SignalR Connected", resp))
        .catch((error) => wormBoxAction("SignalR Fail" + error, "danger"));

      setHubConnectionChat(connection);
      setUserName(String(router?.query?.userName));

      connection?.onclose(() => {
        connection
          ?.start()
          .then((resp) => console.log("SignalR Connected Start", resp))
          .catch((error) =>
            wormBoxAction("SignalR Fail Start" + error, "danger")
          );
        setHubConnectionChat(connection);
      });

      connection?.on("ReceiveMessage", (data: IMessage) => {
        if (data.chatId == router.query.id) {
          addChatMessages(data);
          scrollToDown();
        }
      });
      connection?.on("RemoveMessage", (data: IMessage) => {
        if (data.chatId == router.query.id) {
          removeMessage(data.id);
        }
      });
    }
  }, [router.query.id]);

  const sendMessageInvoke = async () => {
    try {
      if (!message?.trim()) {
        return wormBoxAction("Mensagem vazia...");
      }
      if (hubConnectionChat?.connectionState !== "Disconnected") {
        const objMessage: IMessage = {
          id: generateRandom(),
          userName,
          userId,
          chatId: router.query.id,
          message,
          createdAt: new Date().toISOString(),
          colorGenerate,
        };
        await hubConnectionChat?.invoke("SendMessage", objMessage);
        setMessage("");
        setIsVisiblePicker(false);
      } else {
        wormBoxAction(String(hubConnectionChat?.connectionState), "warning");
      }
    } catch (error) {
      wormBoxAction(String(error), "danger");
    }
  };

  const addChatMessages = (data: IMessage) =>
    setMessages((messages) => [...messages, data]);

  const removeMessageInvoke = async (messageElement: IMessage) => {
    try {
      if (!messageElement.id) {
        return wormBoxAction("Mensagem nao valida...");
      }
      if (hubConnectionChat?.connectionState !== "Disconnected") {
        await hubConnectionChat?.invoke("RemoveMessage", messageElement);
      } else {
        wormBoxAction(String(hubConnectionChat?.connectionState), "warning");
      }
    } catch (error) {
      wormBoxAction(error, "danger");
    }
  };

  const removeMessage = (id: IMessage["id"]) =>
    setMessages((messages) =>
      messages.filter((messageFilter) => messageFilter.id !== id)
    );

  // part de eventos dos components=======================
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

  const pickerOnClick = (emoji, event) => {
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
    hubConnectionChat,
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
  };
};
