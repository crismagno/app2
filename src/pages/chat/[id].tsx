import ChatTop from "../../containers/Chat/Top";
import ChatHeader from "../../containers/Chat/Header";
import ChatContentMessages from "../../containers/Chat/ContentMessages";
import ChatTextarea from "../../containers/Chat/Textarea";
import ChatEmojiPicker from "../../containers/Chat/EmojiPicker";
// import ChatRemoveMessage from "../../containers/Chat/RemoveMessage";
import ChatButtonsTopDown from "../../containers/Chat/ButtonsTopDown";
import ListUsers from "../../containers/Chat/ListUsers";
import ChatRenderMessages from "../../containers/Chat/RenderMessages";
import WormBox from "../../components/WormBox";
import { useChatFunctionsSocketIO } from "../../containers/Chat/functions/useChatFunctionsSocketIO";
import ChatAuth from "../../containers/Chat/Auth";

export default function Chat() {
  const {
    colorGenerate,
    wormState,
    userId,
    userName,
    message,
    setMessage,
    messages,
    setMessages,
    isDragMessage,
    isDragOverRemove,
    isVisiblePicker,
    setIsVisiblePicker,
    hoverRemoveAllMessages,
    setHoverRemoveAllMessages,
    positionScrollChatMessages,
    chatMessagesRef,
    sendMessageInvoke,
    scrollToDown,
    scrollToTop,
    onDragOverHandler,
    onDragStartBubbleMessageHandler,
    onDragEndBubbleMessageHandler,
    onDropHandler,
    onDragDropLeaveHandler,
    onKeypress,
    onScrollChatMessages,
    pickerOnClick,
    removedMessages,
    removeMessageInvoke,
    usersRoom,
  } = useChatFunctionsSocketIO();

  return (
    <ChatAuth>
      <WormBox
        text={wormState.text}
        colorChoose={wormState.colorChoose}
        show={wormState.show}
        className="fixed top-3 right-3"
        animationIn="slideInDown"
        animationOut="slideOutUp"
      />
      <div
        className="
          container 
          d-flex flex-column align-items-center 
        "
      >
        <ChatHeader />
        <div className="row col-12">
          {/* list messages removed of user */}
          {/* <ChatRemoveMessage
            isDragMessage={isDragMessage}
            isDragOverRemove={isDragOverRemove}
            onDropHandler={onDropHandler}
            onDragOverHandler={onDragOverHandler}
            onDragDropLeaveHandler={onDragDropLeaveHandler}
          /> */}
          <ListUsers usersRoom={usersRoom} />
          <div
            className="
            d-flex flex-column justify-content-center 
            col-lg-8 col-md-8 col-sm-12 col-12
          "
            style={{ height: "87vh", position: "relative" }}
          >
            {/* top chat */}
            <ChatTop
              userName={userName}
              userId={userId}
              btnClickTrash={() => setMessages([])}
              btnTrashOnMouseEnter={() => setHoverRemoveAllMessages(true)}
              btnTrashOnMouseLeave={() => setHoverRemoveAllMessages(false)}
              hoverRemoveAllMessages={hoverRemoveAllMessages}
              messagesLength={messages.length}
              colorUserName={colorGenerate}
            />

            {/*  div messages */}
            <ChatContentMessages
              onScrollChatMessages={onScrollChatMessages}
              chatMessagesRef={chatMessagesRef}
            >
              <ChatRenderMessages
                messages={messages}
                message={message}
                userId={userId}
                setMessage={setMessage}
                onDragStartBubbleMessageHandler={
                  onDragStartBubbleMessageHandler
                }
                onDragEndBubbleMessageHandler={onDragEndBubbleMessageHandler}
                removeMessage={removeMessageInvoke}
              />
            </ChatContentMessages>

            {/* buttons top down */}
            <ChatButtonsTopDown
              positionScroll={positionScrollChatMessages}
              scrollToTop={scrollToTop}
              scrollToDown={scrollToDown}
            />

            {/* div textarea */}
            <ChatTextarea
              onChange={(event) => setMessage(event.target.value)}
              onKeypress={onKeypress}
              sendMessageInvoke={sendMessageInvoke}
              setIsVisiblePicker={() => setIsVisiblePicker(!isVisiblePicker)}
              value={message}
            />

            {/* picker */}
            <ChatEmojiPicker
              isVisiblePicker={isVisiblePicker}
              pickerOnClick={pickerOnClick}
            />
          </div>
        </div>
      </div>
    </ChatAuth>
  );
}
