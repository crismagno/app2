import { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useRouter } from "next/router";
import { Animated } from "react-animated-css";
import { generateColor, generateRandom } from "./../../functions/helpers";

import ChatTop from "./../../components/Chat/Top";
import RedirectLogin from "./../../components/Chat/RedirectLogin";
import ChatHeader from "./../../components/Chat/Header";
import ChatContentMessages from "./../../components/Chat/ContentMessages";
import ChatTextarea from "./../../components/Chat/Textarea";
import ChatEmojiPicker from "./../../components/Chat/EmojiPicker";
import ChatRemoveMessage from "./../../components/Chat/RemoveMessage";
import ChatButtonsTopDown from "./../../components/Chat/ButtonsTopDown";

interface IMessage {
  id: string | number;
  userName: string;
  userId: string;
  chatId: string | number | any;
  message: string;
  createdAt: Date | string;
  colorGenerate: string;
}

const colorGenerate = generateColor();

export default function Chat() {
  const router = useRouter();

  const [hubConnectionChat, setHubConnectionChat] = useState<
    HubConnection | any
  >();
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
        .withUrl(`https://localhost:5001/chathub`)
        .configureLogging(LogLevel.Information)
        .build();

      connection
        .start()
        .then((resp) => console.log("SignalR Connected", resp))
        .catch((error) => console.log("SignalR Fail", error));

      setHubConnectionChat(connection);
      setUserName(String(router?.query?.userName));

      connection?.onclose(() => {
        connection
          ?.start()
          .then((resp) => console.log("SignalR Connected Start", resp))
          .catch((error) => console.log("SignalR Fail Start", error));
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
        return alert("Mensagem vazia...");
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
        alert(hubConnectionChat?.connectionState);
      }
    } catch (error) {
      alert(error);
    }
  };

  const addChatMessages = (data: IMessage) =>
    setMessages((messages) => [...messages, data]);

  const removeMessageInvoke = async (messageElement: IMessage) => {
    try {
      if (!messageElement.id) {
        return alert("Mensagem nao valida...");
      }
      if (hubConnectionChat?.connectionState !== "Disconnected") {
        await hubConnectionChat?.invoke("RemoveMessage", messageElement);
      } else {
        alert(hubConnectionChat?.connectionState);
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeMessage = (id: IMessage["id"]) =>
    setMessages((messages) =>
      messages.filter((messageFilter) => messageFilter.id !== id)
    );

  const renderMessages = () => {
    if (messages.length === 0) {
      return (
        <Animated
          className={
            "d-flex flex-column justify-content-center align-items-center w-100 h-100 "
          }
          animationIn={"shake"}
          animationOut="fadeOut"
          animationInDelay={100}
          animationInDuration={400}
          isVisible={messages.length == 0}
        >
          <i style={{ fontSize: 50 }} className={"fa fa-envelope shadow"}></i>
          <h6 className="text-center m-3 shadow">Nenhuma mensagem...</h6>
        </Animated>
      );
    }

    return messages.map((messageElement: IMessage, index: number): JSX.Element => {
      return (
        <div key={`message-element-${index}`}>
          <Animated
            className={`d-flex flex-column ${
              (messageElement.userId === userId && "align-items-end") ||
              "align-items-start"
            }`}
            animationIn={
              messageElement.userId === userId ? "slideInRight" : "slideInLeft"
            }
            animationOut="fadeOut"
            animationOutDelay={100}
            animationInDuration={300}
            isVisible={true}
          >
            {messageElement.userId !== userId && (
              <div
                style={{
                  fontSize: 12,
                  color: messageElement?.colorGenerate || "#FFF",
                }}
                className={"truncate"}
              >
                {messageElement.userName}
              </div>
            )}
            <div
              draggable={messageElement.userId === userId}
              onDragStart={(event) =>
                messageElement.userId === userId &&
                onDragStartHandler(event, messageElement)
              }
              onDragEnd={(event) =>
                messageElement.userId === userId && onDragEndHandler(event)
              }
              onDoubleClick={() =>
                setMessage(`${message}${messageElement.message}`)
              }
              className={`
                message-bubble
                d-flex flex-column
                cursor-pointer
                mb-1 rounded-1 py-1 px-2 
                shadow
                ${
                  messageElement.userId === userId
                    ? "bg-primary-chat float-end"
                    : "bg-secondary-chat float-start"
                }
              `}
              style={{ maxWidth: "80%" }}
            >
              <div className={""}>{messageElement.message}</div>
              <span style={{ fontSize: 9 }} className={""}>
                {new Date(messageElement.createdAt).toLocaleString()}
              </span>
            </div>
          </Animated>
        </div>
      );
    });
  };

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

  if (
    Object.keys(router?.query).indexOf("userName") == -1 ||
    !router?.query?.userName ||
    !String(router?.query?.id).trim()
  ) {
    return <RedirectLogin />;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <ChatHeader />

      <div
        className="
        position-relative
        d-flex flex-column justify-content-center 
        col-lg-8 col-md-8 col-sm-10 col-12"
        style={{ height: "100vh" }}
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
          {renderMessages()}
        </ChatContentMessages>

        {/* div remove */}
        <ChatRemoveMessage
          isDragMessage={isDragMessage}
          isDragOverRemove={isDragOverRemove}
          onDropHandler={onDropHandler}
          onDragOverHandler={onDragOverHandler}
          onDragDropLeaveHandler={onDragDropLeaveHandler}
        />

        {/* buttons top down */}
        <ChatButtonsTopDown
          positionScrollChatMessages={positionScrollChatMessages}
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
  );
}
