import React, { memo } from "react";
import { generateColor } from "../../../functions/helpers";
import { IconChatAlt, IconTrashAlt } from "../../General/icons";

interface IChatTopProps {
  userName: string;
  userId: string | number;
  btnTrashOnMouseEnter: () => void;
  btnTrashOnMouseLeave: () => void;
  btnClickTrash: () => void;
  messagesLength: number;
  hoverRemoveAllMessages: boolean;
  colorUserName: string;
}

export const ChatTop: React.FC<IChatTopProps> = (props): JSX.Element => {
  return (
    <>
      {/* top chat */}
      <div className={"d-flex justify-content-between align-items-center"}>
        <h1 className="d-flex  align-items-center text-center">
          Social
          <div className="d-flex flex-column  justify-content-start align-items-start">
            <span
              style={{ fontSize: 13, color: props.colorUserName }}
              className={`mx-1`}
            >
              <i>[ {props.userName} ]</i>
            </span>
            <span style={{ fontSize: 12, color: "#0D6EFD" }} className={`mx-1`}>
              (user ID: {props.userId} )
            </span>
          </div>
        </h1>
        <div className={"d-flex justify-content-between align-items-center"}>
          <button
            onMouseEnter={() => props?.btnTrashOnMouseEnter()}
            onMouseLeave={() => props?.btnTrashOnMouseLeave()}
            onClick={() => props?.btnClickTrash()}
            className={`border btn ${
              (props.hoverRemoveAllMessages && "btn-outline-danger") ||
              "btn-outline-light border-none"
            } d-flex align-items-center shadow`}
          >
            {/* <i className={`fa ${props.hoverRemoveAllMessages && "fa-trash-alt" || "fa-comment-dots"} `}></i> */}
            {props.hoverRemoveAllMessages ? IconTrashAlt(5) : IconChatAlt(5)}
            <h6 className={"mx-2 p-0 m-0"}>{props.messagesLength}</h6>
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(ChatTop);
