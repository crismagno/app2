import { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useRouter } from "next/router";
import {Animated} from "react-animated-css";
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'
import { generateColor, generateRandom } from "./../../functions/helpers";

import ChatTop from "./../../components/Chat/Top";
import RedirectLogin from "./../../components/Chat/RedirectLogin";

interface IMessage {
  id: string | number;
  userName: string;
  userId: string;
  chatId: string | number | any;
  message: string;
  createdAt: Date | string; 
  colorGenerate: string;
}

interface IUser {
  userId: string;
  userName: string; 
  chatId: string | number | any;
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
    scrollTop: any,
      clientHeight: any,
      scrollHeight: any,
  }>(null);
  const chatMessagesRef = useRef(null); 
  let connection: HubConnection;

  useEffect(() => {
    if (router.query.id) {
      connection = new HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_URL_SIGNALR}chathub`)
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
          colorGenerate
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

  const addChatMessages = (data: IMessage) => setMessages((messages) => [...messages, data]);

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

  const removeMessage = (id: IMessage["id"]) => setMessages(messages => messages.filter(messageFilter => messageFilter.id !== id));

  const renderMessages = () => {
    if (messages.length === 0) {
      return <Animated
        className={"d-flex flex-column justify-content-center align-items-center w-100 h-100 "}
        animationIn={"shake"} 
        animationOut="fadeOut" 
        animationInDelay={100}
        animationInDuration={400}
        isVisible={messages.length == 0}
      >
        <i style={{fontSize: 50}} className={"fa fa-envelope shadow"}></i>
        <h6 className="text-center m-3 shadow">Nenhuma mensagem...</h6>
      </Animated>
    }

    return messages.map((messageElement) => {
      return <div>
        <Animated 
          className={`d-flex flex-column ${messageElement.userId === userId && "align-items-end" || "align-items-start"}`}
          animationIn={messageElement.userId === userId ? "slideInRight" : "slideInLeft"} 
          animationOut="fadeOut" 
          animationOutDelay={100}
          animationInDuration={300}
          isVisible={true}
        >
            {
              messageElement.userId !== userId &&
              <div style={{fontSize: 12, color: messageElement?.colorGenerate || "#FFF"}} className={"truncate"}>
                {messageElement.userName}
              </div>
            }
            <div 
              draggable={messageElement.userId === userId}
              onDragStart={(event) => messageElement.userId === userId && onDragStartHandler(event, messageElement)}
              onDragEnd={(event) => messageElement.userId === userId && onDragEndHandler(event)}
              onDoubleClick={() => setMessage(`${message}${messageElement.message}`)}
              className={`
                message-bubble
                d-flex flex-column
                cursor-pointer
                mb-1 rounded-1 py-1 px-2 
                shadow
                ${messageElement.userId === userId ? "bg-primary-chat float-end" : "bg-secondary-chat float-start"}
              `} 
              style={{maxWidth: "80%"}}
            >
              <div className={""}>
                {messageElement.message}
              </div>
            <span 
              style={{fontSize: 9}}
              className={""}>{new Date(messageElement.createdAt).toLocaleString()}</span>
            </div>
        </Animated>
      </div> 
    });
  };
  
  // part de eventos dos components=======================
  const scrollToDown = () => {
      chatMessagesRef?.current.scroll(0, chatMessagesRef?.current.scrollHeight, "smooth");
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
    })
  }

  const pickerOnClick = (emoji, event) => {
    setMessage(text => `${text}${emoji.native}`);
  };

  if ((Object.keys(router?.query).indexOf("userName") == -1 || !router?.query?.userName) || !String(router?.query?.id).trim()) {
    return <RedirectLogin />
  }
  
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div onClick={() => router?.back()} className={"d-flex justify-content-end"} style={{position: "absolute", top: 10, left: 10 }}>
          <button className={"btn btn-outline-light "}>Voltar</button>
      </div>

      <div className="
        position-relative
        d-flex flex-column justify-content-center 
        col-lg-8 col-md-8 col-sm-10 col-12" 
        style={{height: "100vh"}}
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
        <div
          onScroll={onScrollChatMessages}
          ref={chatMessagesRef}
          id="chat-messages" 
          className="
            d-flex flex-column 
            border-bottom border-top
            my-2 pt-2 pb-1 px-2" 
          style={{height: "400px", overflowX: "hidden"}}
        >
          {renderMessages()} 
        </div>

        {/* div remove */}
        <Animated
          animationIn={"zoomIn"} 
          animationOut={"zoomOut"} 
          animationInDelay={100}
          animationInDuration={500}
          animationOutDuration={500}
          isVisible={isDragMessage}
        >
          <div 
            onDrop={onDropHandler}
            onDragOver={onDragOverHandler}
            onDragLeave={onDragDropLeaveHandler}
            className={` drop-trash ${isDragOverRemove && "drop-trash-hover" || ""}`}>
            <i className={"fa fa-trash-alt icon-remove-message"}></i>
          </div>
        </Animated>

        {/* buttons top down */}
        <div className={`view-buttons-arrows`}>
          <Animated
            animationIn={"zoomIn"} 
            animationOut="zoomOut" 
            animationInDelay={100}
            animationInDuration={300}
            animationOutDuration={300}
            isVisible={positionScrollChatMessages?.clientHeight < positionScrollChatMessages?.scrollHeight && positionScrollChatMessages?.scrollTop !== 0}
          >
            <button onClick={scrollToTop} className={"btn btn-primary btn-top shadow-sm mb-1"}>
              <i className={"fa fa-arrow-up"}></i>
            </button>
          </Animated>
          <Animated
            animationIn={"zoomIn"} 
            animationOut="zoomOut" 
            animationInDelay={100}
            animationInDuration={300}
            animationOutDuration={300}
            isVisible={positionScrollChatMessages?.clientHeight < positionScrollChatMessages?.scrollHeight && !(positionScrollChatMessages?.scrollTop + positionScrollChatMessages?.clientHeight === positionScrollChatMessages?.scrollHeight)}
          >
            <button onClick={scrollToDown} className={"btn btn-primary btn-down shadow-sm"}>
              <i className={"fa fa-arrow-down"}></i>
            </button>
          </Animated>
        </div>
        
        {/* div textarea */}
        <div className={"d-flex flex-row align-items-center"}>
          <textarea
            onKeyPress={onKeypress}
            className="shadow-none form-control"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            style={{resize: "none"}}
            placeholder={`Mensagem...`}
          />
          <button className="btn btn-secondary mt-1 shadow-none h-100 mb-1 ml-1 px-4 mx-1" onClick={() => setIsVisiblePicker(!isVisiblePicker)}>
            <i className={"fa fa-surprise"}></i>
          </button>
          <button className="btn btn-primary mt-1 shadow-none h-100 mb-1 ml-1 px-4" onClick={sendMessageInvoke}>
            <i className={"fa fa-paper-plane"}></i>
          </button>
        </div>

        {/* picker */}
        <Animated
          animationIn={"fadeIn"} 
          animationOut="fadeOut" 
          animationInDelay={500}
          animationInDuration={500}
          animationOutDuration={500}
          isVisible={isVisiblePicker}
        >
          <div className={`view-picker`}>
            <Picker 
              autoFocus={true}
              theme={"auto"}
              color={"#0D6EFD"}
              set={"google"}
              i18n={{
                search: "Buscando...",
                categories: {
                  search: 'Buscar',
                  recent: 'Recentes',
                  smileys: 'Sorrisos',
                  people: 'Pessoas',
                  nature: 'Natureza',
                  foods: 'Comidas e Bebidas',
                  activity: 'Atividade',
                  places: 'Viagens e Lugares',
                  objects: 'Objetos',
                  symbols: 'Simbolos',
                  flags: 'Bandeiras',
                  custom: 'Customizados',
                }
              }}
              onClick={pickerOnClick}
            />
          </div>
        </Animated>

      </div> 
    </div>
  );
}
