interface ChatTextareaProps {
  onKeypress: (event: any) => void;
  onChange: (event: any) => void;
  setIsVisiblePicker: (event: any) => void;
  sendMessageInvoke: (event: any) => void;
  value: string;
}

export const ChatTextarea: React.FC<ChatTextareaProps> = (
  props
): JSX.Element => {
  return (
    <div className={"d-flex flex-row align-items-center"}>
      <textarea
        onKeyPress={props.onKeypress}
        className="shadow-none form-control"
        onChange={(event) => props.onChange(event)}
        value={props.value}
        style={{ resize: "none" }}
        placeholder={`Mensagem...`}
      />
      <button
        className="btn btn-secondary mt-1 shadow-none h-100 mb-1 ml-1 px-4 mx-1"
        onClick={props.setIsVisiblePicker}
      >
        <i className={"fa fa-surprise"}></i>
      </button>
      <button
        className="btn btn-primary mt-1 shadow-none h-100 mb-1 ml-1 px-4"
        onClick={props.sendMessageInvoke}
      >
        <i className={"fa fa-paper-plane"}></i>
      </button>
    </div>
  );
};

export default ChatTextarea;
