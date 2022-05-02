import ChatTop from "../../containers/Chat/Top";
import ChatHeader from "../../containers/Chat/Header";
import ChatContentMessages from "../../containers/Chat/ContentMessages";
import ChatTextarea from "../../containers/Chat/Textarea";
import ChatEmojiPicker from "../../containers/Chat/EmojiPicker";
import ChatButtonsTopDown from "../../containers/Chat/ButtonsTopDown";
import ListUsers from "../../containers/Chat/ListUsers";
import ChatRenderMessages, {
  IMessage,
} from "../../containers/Chat/RenderMessages";
import WormBox, { EColorChoose, IWormBoxProps } from "../../components/WormBox";
import { useChatFunctionsSocketIO } from "../../containers/Chat/functions/useChatFunctionsSocketIO";
import ChatAuth from "../../containers/Chat/Auth";
import { NextRouter, useRouter } from "next/router";
import { useState, useRef, useEffect, MutableRefObject } from "react";
import { Socket } from "socket.io-client";
import { IWormState, IUserRoom } from "../../containers/Chat/functions/types";
import { IChatScrollPosition } from "../../containers/Chat/types";
import { generateColor, generateRandom } from "../../utils/helpers";
import { SocketChat } from "../../utils/SocketChat.ts";
import { ISocketChatQuery } from "../../utils/SocketChat.ts/types";

const colorGenerate: string = generateColor();

export default function Chat() {
  const router: NextRouter = useRouter();

  const [wormState, setWormState] = useState<IWormState>({
    colorChoose: EColorChoose.white,
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
  const [usersRoom, setUsersRoom] = useState<IUserRoom[]>([]);
  const [positionScrollChatMessages, setPositionScrollChatMessages] =
    useState<IChatScrollPosition>(null);
  const chatMessagesRef: MutableRefObject<any> = useRef(null);
  const socketChat = new SocketChat();

  useEffect(() => {
    if (router.query.id) {
      setUserName(String(router.query.userName));
      socketChat
        .start(querySocketChat(router))
        .then((socket) => socketOn(socket, String(router.query.id)))
        .catch((error) => wormBoxAction(error, EColorChoose.danger, 2000));
      return () => {
        socketChat.disconnect();
      };
    }
  }, [router]);

  const querySocketChat = (router: NextRouter): Partial<ISocketChatQuery> => ({
    userId: userId,
    username: String(router.query.userName),
    room: String(router.query.id),
    avatar: String(router.query.userAvatar),
    userColor: colorGenerate,
  });

  // Listening all socket on
  const socketOn = (socket: Socket, room: string): void => {
    socket?.on("connect", () => {
      wormBoxAction("Connected...", EColorChoose.success);
    });

    socket?.on("disconnect", () => {
      wormBoxAction("Disconnected!!!", EColorChoose.danger);
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
    });

    socket?.on(`onRemoveMessage-${room}`, (data: IMessage) => {
      addChatRemovedMessages(data);
      removeMessage(data.id);
    });
  };

  // Send message to socket
  const sendMessageInvoke = async (): Promise<void> => {
    try {
      if (!message?.trim()) {
        return wormBoxAction("Empty message!", EColorChoose.warning);
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
      wormBoxAction(String(error), EColorChoose.warning);
    }
  };

  // Send message to remove to socket
  const removeMessageInvoke = async (message: IMessage): Promise<void> => {
    try {
      if (!message.id) {
        wormBoxAction("Empty message!");
        return;
      }
      socketChat.emitRemoveMessage(message);
    } catch (error) {
      wormBoxAction(error, EColorChoose.warning);
    }
  };

  // add message on component
  const addChatMessages = (data: IMessage): void =>
    setMessages((messages) => [...messages, data]);

  // add message on messages removed by user component
  const addChatRemovedMessages = (data: IMessage): void =>
    setRemovedMessages((messages) => [...messages, data]);

  // remove message of messages of component
  const removeMessage = (id: IMessage["id"]): void =>
    setMessages((messages) =>
      messages.filter((messageFilter) => messageFilter.id !== id)
    );

  // part of events components=======================
  const scrollToDown = (): void => {
    chatMessagesRef?.current.scroll(
      0,
      chatMessagesRef?.current.scrollHeight,
      "smooth"
    );
  };
  const scrollToTop = (): void => {
    chatMessagesRef?.current.scroll(0, 0, "smooth");
  };

  const onDragOverHandler = (event: any): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsDragOverRemove(true);
  };

  const onDragStartBubbleMessageHandler = (event, messageElement: IMessage) => {
    setIsDragMessage(true);
    setIsVisiblePicker(false);
    event.dataTransfer.setData("text/plain", JSON.stringify(messageElement));
    event.dropEffect = "move";
  };

  const onDragEndBubbleMessageHandler = (event: any): void => {
    setIsDragMessage(false);
  };

  const onDropHandler = (event: any): void => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const messageToRemove: IMessage = JSON.parse(data);
    removeMessageInvoke(messageToRemove);
    setIsDragMessage(false);
    setIsDragOverRemove(false);
  };

  const onDragDropLeaveHandler = (event: any): void => {
    setIsDragOverRemove(false);
  };

  const onKeypress = (event: any): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessageInvoke();
    }
  };

  const onScrollChatMessages = (event: any): void => {
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
    colorChoose: IWormBoxProps["colorChoose"] = EColorChoose.white,
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

  return (
    <ChatAuth>
      <>
        <WormBox
          text={wormState.text}
          colorChoose={wormState.colorChoose}
          show={wormState.show}
          className="fixed top-3 right-3"
          animationIn="slideInDown"
          animationOut="slideOutUp"
        />
        <div
          className="
            container
            d-flex flex-column align-items-center
          "
        >
          <ChatHeader />
          <div className="row col-12">
            <ListUsers usersRoom={usersRoom} />
            <div
              className="
              d-flex flex-column justify-content-center
              col-lg-8 col-md-8 col-sm-12 col-12
            "
              style={{ height: "87vh", position: "relative" }}
            >
              {/* top chat */}
              <ChatTop
                userName={userName}
                userId={userId}
                btnClickTrash={() => setMessages([])}
                btnTrashOnMouseEnter={() => setHoverRemoveAllMessages(true)}
                btnTrashOnMouseLeave={() => setHoverRemoveAllMessages(false)}
                hoverRemoveAllMessages={hoverRemoveAllMessages}
                messagesLength={messages.length}
                colorUserName={colorGenerate}
              />

              {/*  div messages */}
              <ChatContentMessages
                onScrollChatMessages={onScrollChatMessages}
                chatMessagesRef={chatMessagesRef}
              >
                <ChatRenderMessages
                  messages={messages}
                  message={message}
                  userId={userId}
                  setMessage={setMessage}
                  onDragStartBubbleMessageHandler={
                    onDragStartBubbleMessageHandler
                  }
                  onDragEndBubbleMessageHandler={onDragEndBubbleMessageHandler}
                  removeMessage={removeMessageInvoke}
                />
              </ChatContentMessages>

              {/* buttons top down */}
              <ChatButtonsTopDown
                positionScroll={positionScrollChatMessages}
                scrollToTop={scrollToTop}
                scrollToDown={scrollToDown}
              />

              {/* div textarea */}
              <ChatTextarea
                onChange={(event) => setMessage(event.target.value)}
                onKeypress={onKeypress}
                sendMessageInvoke={sendMessageInvoke}
                setIsVisiblePicker={() => setIsVisiblePicker(!isVisiblePicker)}
                value={message}
              />

              {/* picker */}
              <ChatEmojiPicker
                isVisiblePicker={isVisiblePicker}
                pickerOnClick={pickerOnClick}
              />
            </div>
          </div>
        </div>
      </>
    </ChatAuth>
  );
}
