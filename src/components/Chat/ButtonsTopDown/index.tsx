import { Animated } from "react-animated-css";

interface ChatButtonsTopDownProps {
  positionScrollChatMessages?: any;
  scrollToTop: (event: any) => void;
  scrollToDown: (event: any) => void;
}

export const ChatButtonsTopDown: React.FC<ChatButtonsTopDownProps> = (
  props
) => {
  return (
    <div className={`view-buttons-arrows`}>
      <Animated
        animationIn={"zoomIn"}
        animationOut="zoomOut"
        animationInDelay={100}
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={
          props.positionScrollChatMessages?.clientHeight <
            props.positionScrollChatMessages?.scrollHeight &&
          props.positionScrollChatMessages?.scrollTop !== 0
        }
      >
        <button
          onClick={props.scrollToTop}
          className={"btn btn-primary btn-top shadow-sm mb-1"}
        >
          <i className={"fa fa-arrow-up"}></i>
        </button>
      </Animated>
      <Animated
        animationIn={"zoomIn"}
        animationOut="zoomOut"
        animationInDelay={100}
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={
          props.positionScrollChatMessages?.clientHeight <
            props.positionScrollChatMessages?.scrollHeight &&
          !(
            props.positionScrollChatMessages?.scrollTop +
              props.positionScrollChatMessages?.clientHeight ===
            props.positionScrollChatMessages?.scrollHeight
          )
        }
      >
        <button
          onClick={props.scrollToDown}
          className={"btn btn-primary btn-down shadow-sm"}
        >
          <i className={"fa fa-arrow-down"}></i>
        </button>
      </Animated>
    </div>
  );
};

export default ChatButtonsTopDown;
