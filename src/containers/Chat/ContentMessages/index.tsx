interface IChatContentMessagesProps {
  onScrollChatMessages: (event: any) => void;
  onMouseOver?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
  chatMessagesRef: any;
}

export const ChatContentMessages: React.FC<IChatContentMessagesProps> = ({
  onScrollChatMessages,
  onMouseOver,
  onMouseLeave,
  chatMessagesRef,
  children,
}): JSX.Element => {
  return (
    <div
      onScroll={onScrollChatMessages}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      ref={chatMessagesRef}
      id="chat-messages"
      className="
        flex-1
        d-flex flex-column 
        border-bottom border-top
        my-2 pt-2 pb-1 px-2
        bg-gradient-to-tr from-gray-800 to-gray-900
      "
      style={{ height: "450px", overflowX: "hidden" }}
    >
      {children}
    </div>
  );
};

export default ChatContentMessages;
