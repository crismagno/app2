import { memo, useState } from "react";
import { Animated } from "react-animated-css";

export interface IRenderMessagesProps {
  messages: any;
  message: string;
  userId: string;
  onDragStartBubbleMessageHandler: (event, messageElement) => void;
  onDragEndBubbleMessageHandler: (event) => void;
  setMessage: (string) => void;
  removeMessage: (message: IMessage) => Promise<void>;
}

export interface IMessage {
  id: string | number;
  userName: string;
  userId: string;
  room: string | number | any;
  message: string;
  createdAt: Date | string;
  colorGenerate: string;
}

const colorSend = `bg-gradient-to-tr from-blue-600 to-blue-800
hover:bg-gradient-to-tr hover:from-blue-800 hover:to-blue-900`;

const colorReceive = `bg-gradient-to-tr from-gray-500 to-gray-600
hover:bg-gradient-to-tr hover:from-gray-600 hover:to-gray-700`;

export const ChatRenderMessages: React.FC<IRenderMessagesProps> = ({
  messages,
  message,
  userId,
  onDragStartBubbleMessageHandler,
  onDragEndBubbleMessageHandler,
  setMessage,
  removeMessage,
}): JSX.Element | any => {
  const [messagesToShowTrash, setMessagesToShowTrash] = useState<IMessage[]>(
    []
  );

  let start;
  let end;
  let delta;

  const onMouseDown = (): void => {
    start = new Date();
  };

  const onMouseUp = (message: IMessage): void => {
    end = new Date();
    delta = (end - start) / 1000.0;

    if (delta > 1) {
      if (
        messagesToShowTrash.findIndex(
          (_messageToShowTrash: IMessage) =>
            message.id === _messageToShowTrash.id
        ) === -1
      ) {
        setMessagesToShowTrash((_messagesToShowTrash: IMessage[]) => [
          ..._messagesToShowTrash,
          message,
        ]);

        setTimeout(() => {
          setMessagesToShowTrash((_messagesToShowTrash: IMessage[]) => {
            return _messagesToShowTrash.filter(
              (_messageToShowTrash) => message.id !== _messageToShowTrash.id
            );
          });
        }, 5000);
      }
    }
  };

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
        <i style={{ fontSize: 40 }} className={"fa fa-envelope shadow"}></i>
        <h6 className="text-center m-3 shadow">Empty messages...</h6>
      </Animated>
    );
  }

  return messages.map(
    (messageElement: IMessage, index: number): JSX.Element => {
      return (
        <div
          key={`message-element-${index}`}
          className={`flex ${
            messageElement.userId === userId ? "flex-row" : "flex-row-reverse"
          } justify-between items-center`}
        >
          {/* show trash component */}
          {messagesToShowTrash.findIndex(
            (_messageToShowTrash: IMessage) =>
              messageElement.id === _messageToShowTrash.id
          ) > -1 && (
            <button
              className="btn btn-outline-danger btn-sm inline-block"
              onClick={() => removeMessage(messageElement)}
            >
              <i className="far fa-trash-alt" />
            </button>
          )}

          {/* bubble message component */}
          <Animated
            className={`
              inline-flex flex-1 flex-column
              ${
                (messageElement.userId === userId && "align-items-end") ||
                "align-items-start"
              }`}
            animationIn={
              messageElement.userId === userId ? "slideInRight" : "slideInLeft"
            }
            animationOut="fadeOut"
            animationInDuration={300}
            isVisible
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
              draggable
              onDragStart={(event) =>
                messageElement.userId === userId &&
                onDragStartBubbleMessageHandler(event, messageElement)
              }
              onDragEnd={(event) =>
                messageElement.userId === userId &&
                onDragEndBubbleMessageHandler(event)
              }
              onDoubleClick={() =>
                setMessage(`${message}${messageElement.message}`)
              }
              onMouseDown={onMouseDown}
              onMouseUp={() => onMouseUp(messageElement)}
              className={`
                message-bubble
                d-flex flex-column
                cursor-pointer
                mb-1 rounded-1 py-1 px-2 
                shadow
                ${messageElement.userId === userId ? colorSend : colorReceive}
              `}
              style={{ maxWidth: "80%", minWidth: "7rem" }}
            >
              <div className={""}>{messageElement.message}</div>
              <span style={{ fontSize: 9 }} className={""}>
                {new Date(messageElement.createdAt).toLocaleString()}
              </span>
            </div>
          </Animated>
        </div>
      );
    }
  );
};

export default memo(ChatRenderMessages);
