import { Animated } from "react-animated-css";
import { IMessage } from "../RenderMessages";

interface IChatRemoveMessageProps {
  isDragMessage: boolean;
  isDragOverRemove: boolean;
  onDropHandler: (event: any) => void;
  onDragOverHandler: (event: any) => void;
  onDragDropLeaveHandler: (event: any) => void;
}

export const ChatRemoveMessage: React.FC<IChatRemoveMessageProps> = ({
  isDragMessage,
  isDragOverRemove,
  onDragDropLeaveHandler,
  onDragOverHandler,
  onDropHandler,
}) => {
  return (
    <div
      className={`
      position-relative 
      d-flex flex-column justify-content-center 
      col-lg-4 col-md-4 col-sm-2 col-12
      border
    `}
      style={{ maxHeight: "41rem" }}
    >
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
          className={`drop-trash ${
            (isDragOverRemove && "drop-trash-hover") || ""
          }`}
        >
          <i className={"fa fa-trash-alt icon-remove-message"}></i>
        </div>
      </Animated>
    </div>
  );
};

export default ChatRemoveMessage;
