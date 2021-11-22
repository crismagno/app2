import { Animated } from "react-animated-css";

interface IChatRemoveMessageProps {
  isDragMessage: boolean;
  isDragOverRemove: boolean;
  onDropHandler: (event: any) => void;
  onDragOverHandler: (event: any) => void;
  onDragDropLeaveHandler: (event: any) => void;
}

export const ChatRemoveMessage: React.FC<IChatRemoveMessageProps> = (props) => {
  return (
    <Animated
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      animationInDelay={100}
      animationInDuration={500}
      animationOutDuration={500}
      isVisible={props.isDragMessage}
      // isVisible={true}
    >
      <div
        onDrop={props.onDropHandler}
        onDragOver={props.onDragOverHandler}
        onDragLeave={props.onDragDropLeaveHandler}
        className={`drop-trash ${
          (props.isDragOverRemove && "drop-trash-hover") || ""
        }`}
      >
        <i className={"fa fa-trash-alt icon-remove-message"}></i>
      </div>
    </Animated>
  );
};

export default ChatRemoveMessage;
