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
          className="shadow-none form-control rounded-full pl-4 pr-16 py-2 mr-2"
          onChange={onChange}
          value={value}
          style={{ resize: "none" }}
          placeholder={`Message...`}
        />
        <button
          className={`absolute
          btn bg-gradient-to-tr from-gray-500 to-gray-600
          hover:bg-gradient-to-tr hover:from-gray-600 hover:to-yellow-400
          text-white mt-1
          shadow-none h-100 mb-1 ml-1 px-4 mx-1 rounded-full
        `}
          onClick={setIsVisiblePicker}
          style={{ right: "4.3rem" }}
        >
          <i className="far fa-smile" />
        </button>
        <button
          className={`
          btn bg-gradient-to-tr from-blue-500 to-blue-600
          hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-700
        text-white mt-1 shadow-none h-100 mb-1 ml-0 px-4 rounded-full
        `}
          onClick={sendMessageInvoke}
        >
          <i className="far fa-paper-plane" />
        </button>
      </div>
      <ChatEmojiPicker
        isVisiblePicker={isVisiblePicker}
        pickerOnClick={pickerOnClick}
      />
    </>
  );
};

export default ChatTextarea;
