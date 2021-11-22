import { Animated } from "react-animated-css";
import { IChatScrollPosition } from "../types";

interface IChatButtonsTopDownProps {
  positionScroll: IChatScrollPosition;
  scrollToTop: (event: any) => void;
  scrollToDown: (event: any) => void;
  show: boolean;
}

export const ChatButtonsTopDown: React.FC<IChatButtonsTopDownProps> = ({
  positionScroll,
  scrollToDown,
  scrollToTop,
  show,
}): JSX.Element => {
  return (
    <Animated
      className={`view-buttons-arrows`}
      animationIn={"slideInRight"}
      animationOut="slideOutRight"
      animationInDelay={100}
      animationInDuration={300}
      animationOutDuration={300}
      isVisible={show}
    >
      <Animated
        animationIn={"zoomIn"}
        animationOut="zoomOut"
        animationInDelay={100}
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={
          positionScroll?.clientHeight < positionScroll?.scrollHeight &&
          positionScroll?.scrollTop !== 0
        }
      >
        <button
          onClick={scrollToTop}
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
          positionScroll?.clientHeight < positionScroll?.scrollHeight &&
          !(
            positionScroll?.scrollTop + positionScroll?.clientHeight >=
            positionScroll?.scrollHeight - 5
          )
        }
      >
        <button
          onClick={scrollToDown}
          className={"btn btn-primary btn-down shadow-sm"}
        >
          <i className={"fa fa-arrow-down"}></i>
        </button>
      </Animated>
    </Animated>
  );
};

export default ChatButtonsTopDown;
