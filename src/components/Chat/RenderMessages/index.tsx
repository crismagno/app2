import { Animated } from "react-animated-css";
import { IconChatAlt } from "../../General/icons";

export interface IRenderMessagesProps {
    messages: any;
    message: string;
    userId: string;
    onDragStartHandler: (event, messageElement) => void;
    onDragEndHandler: (event) => void;
    setMessage: (string) => void;
}

export interface IMessage {
    id: string | number;
    userName: string;
    userId: string;
    chatId: string | number | any;
    message: string;
    createdAt: Date | string;
    colorGenerate: string;
  }

export const ChatRenderMessages: React.FC<IRenderMessagesProps> = ({
    messages,
    message,
    userId,
    onDragStartHandler,
    onDragEndHandler,
    setMessage
}): JSX.Element  | any => {
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
          {/* <i style={{ fontSize: 50 }} className={"fa fa-envelope shadow"}></i> */}
          {IconChatAlt(12)}
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