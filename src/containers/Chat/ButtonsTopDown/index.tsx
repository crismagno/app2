import { memo } from "react";
import { IChatScrollPosition } from "../types";

interface IChatButtonsTopDownProps {
  positionScroll: IChatScrollPosition;
  scrollToTop: (event: any) => void;
  scrollToDown: (event: any) => void;
}

export const ChatButtonsTopDown: React.FC<IChatButtonsTopDownProps> = ({
  positionScroll,
  scrollToDown,
  scrollToTop,
}): JSX.Element => {
  return (
    <div className={`view-buttons-arrows`}>
      {positionScroll?.clientHeight < positionScroll?.scrollHeight &&
        positionScroll?.scrollTop !== 0 &&  (
          <button
            onClick={scrollToTop}
            className={"btn btn-primary btn-top shadow-sm mb-1"}
          >
            <i className={"fa fa-arrow-up"}></i>
          </button>
        )}

      {positionScroll?.clientHeight < positionScroll?.scrollHeight &&
        !(
          positionScroll?.scrollTop + positionScroll?.clientHeight >=
          positionScroll?.scrollHeight - 5
        ) && (
          <button
            onClick={scrollToDown}
            className={"btn btn-primary btn-down shadow-sm"}
          >
            <i className={"fa fa-arrow-down"}></i>
          </button>
        )}
    </div>
  );
};

export default memo(ChatButtonsTopDown);
