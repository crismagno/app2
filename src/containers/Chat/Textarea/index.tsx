import { memo } from "react";

interface ChatTextareaProps {
  onKeypress: (event: any) => void;
  onChange: (event: any) => void;
  setIsVisiblePicker: (event: any) => void;
  sendMessageInvoke: (event: any) => void;
  value: string;
}

export const ChatTextarea: React.FC<ChatTextareaProps> = ({
  onChange,
  onKeypress,
  sendMessageInvoke,
  setIsVisiblePicker,
  value,
}): JSX.Element => {
  return (
    <div className={"d-flex flex-row align-items-center"}>
      <textarea
        onKeyPress={onKeypress}
        className="shadow-none form-control"
        onChange={onChange}
        value={value}
        style={{ resize: "none" }}
        placeholder={`Message...`}
      />
      <button
        className={`btn btn-secondary h-100 ml-1 px-4 mx-1
        `}
        onClick={setIsVisiblePicker}
      >
        <i className="far fa-smile" />
      </button>
      <button
        className={`btn btn-primary h-100 ml-0 px-4
        `}
        onClick={sendMessageInvoke}
      >
        <i className="far fa-paper-plane" />
      </button>
    </div>
  );
};

export default ChatTextarea;
