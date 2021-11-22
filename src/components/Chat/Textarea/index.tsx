import { IconPlaneAlt, IconSmileAlt } from "../../General/icons";

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
  children,
}): JSX.Element => {
  const colorBtnPicker = `bg-gradient-to-tr from-gray-500 to-gray-600
    hover:bg-gradient-to-tr hover:from-gray-600 hover:to-gray-700`;

  const colorBtnSend = `bg-gradient-to-tr from-blue-500 to-blue-600
    hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-700`;

  return (
    <div className={"d-flex flex-row align-items-center"}>
      <textarea
        onKeyPress={onKeypress}
        className="shadow-none form-control"
        onChange={(event) => onChange(event)}
        value={value}
        style={{ resize: "none" }}
        placeholder={`Mensagem...`}
      />
      <button
        className={`btn ${colorBtnPicker} text-white mt-1 shadow-none h-100 mb-1 ml-1 px-4 mx-1`}
        onClick={setIsVisiblePicker}
      >
        {IconSmileAlt(5)}
      </button>
      <button
        className={`btn ${colorBtnSend} text-white mt-1 shadow-none h-100 mb-1 ml-0 px-4`}
        onClick={sendMessageInvoke}
      >
        {IconPlaneAlt(5)}
      </button>
    </div>
  );
};

export default ChatTextarea;
