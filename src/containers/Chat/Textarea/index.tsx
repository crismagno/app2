import { memo } from "react";
import ChatEmojiPicker from "../EmojiPicker";

interface ChatTextareaProps {
  onKeypress: (event: any) => void;
  onChange: (event: any) => void;
  setIsVisiblePicker: (event: any) => void;
  sendMessageInvoke: (event: any) => void;
  pickerOnClick: (emoji: any, event: any) => void;
  value: string;
  isVisiblePicker: boolean;
}

export const ChatTextarea: React.FC<ChatTextareaProps> = ({
  onChange,
  onKeypress,
  sendMessageInvoke,
  setIsVisiblePicker,
  pickerOnClick,
  value,
  isVisiblePicker,
}): JSX.Element => {
  return (
    <>
      <div className={"relative d-flex flex-row align-items-center"}>
        <textarea
          onKeyPress={onKeypress}
          className="shadow-none form-control pl-4 pr-16 py-2 mr-2"
          onChange={onChange}
          value={value}
          style={{ resize: "none" }}
          placeholder={`Message...`}
        />
        <button
          disabled
          className={`
          absolute
          btn btn-warning
          text-white mt-1
          shadow-none h-100 mb-1 ml-1 px-4 mx-1 rounded-full
        `}
          onClick={setIsVisiblePicker}
          style={{ right: "4.3rem" , display: 'none'}}
        >
          <i className="far fa-smile" />
        </button>
        <button
        disabled={!value}
          className={`btn btn-primary text-white mt-1 shadow-none h-100 mb-1 ml-1 mx-1 px-4 rounded-full
        `}
          onClick={sendMessageInvoke}
        >
          <i className="far fa-paper-plane" />
        </button>
      </div>
      {/* <ChatEmojiPicker
        isVisiblePicker={isVisiblePicker}
        pickerOnClick={pickerOnClick}
      /> */}
    </>
  );
};

export default ChatTextarea;
