import { Animated } from "react-animated-css";
import { IChatScrollPosition } from "../types";

interface IChatButtonsTopDownProps {
  positionScroll: IChatScrollPosition;
  scrollToTop: (event: any) => void;
  scrollToDown: (event: any) => void;
  show: boolean;
}

export const ChatButtonsTopDown: React.FC<IChatButtonsTopDownProps> = (
  props
): JSX.Element => {
  return (
    <div className={`view-buttons-arrows`}>
      <Animated
        animationIn={"zoomIn"}
        animationOut="zoomOut"
        animationInDelay={100}
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={
          props.positionScroll?.clientHeight <
            props.positionScroll?.scrollHeight &&
          props.positionScroll?.scrollTop !== 0
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
          props.positionScroll?.clientHeight <
            props.positionScroll?.scrollHeight &&
          !(
            props.positionScroll?.scrollTop +
              props.positionScroll?.clientHeight >=
            props.positionScroll?.scrollHeight - 5
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
