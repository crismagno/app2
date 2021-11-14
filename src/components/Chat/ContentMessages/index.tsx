
interface ChatContentMessagesProps {
    onScrollChatMessages: (event: any) => void;
    chatMessagesRef: any;
}

export const ChatContentMessages: React.FC<ChatContentMessagesProps> = (props): JSX.Element => {
    return (
        <div
          onScroll={props.onScrollChatMessages}
          ref={props.chatMessagesRef}
          id="chat-messages" 
          className="
            d-flex flex-column 
            border-bottom border-top
            my-2 pt-2 pb-1 px-2" 
          style={{height: "400px", overflowX: "hidden"}}
        >
            {props.children}
        </div>
    );
};

export default ChatContentMessages;