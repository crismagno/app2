import { useRouter } from "next/router";
import ChatTop from "../../containers/Chat/Top";
import RedirectLogin from "../../containers/Chat/RedirectLogin";
import ChatHeader from "../../containers/Chat/Header";
import ChatContentMessages from "../../containers/Chat/ContentMessages";
import ChatTextarea from "../../containers/Chat/Textarea";
import ChatEmojiPicker from "../../containers/Chat/EmojiPicker";
import ChatRemoveMessage from "../../containers/Chat/RemoveMessage";
import ChatButtonsTopDown from "../../containers/Chat/ButtonsTopDown";
import { ListUsers } from "../../containers/Chat/ListUsers";
import { ChatRenderMessages } from "../../containers/Chat/RenderMessages";
import { WormBox } from "../../components/WormBox";
import { useChatFunctionsSocketIO } from "../../containers/Chat/functions/useChatFunctionsSocketIO";

export default function Chat() {
  const router = useRouter();

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
    onDragStartHandler,
    onDragEndHandler,
    onDropHandler,
    onDragDropLeaveHandler,
    onKeypress,
    onScrollChatMessages,
    pickerOnClick,
    isMouseEnterDivMain,
    setIsMouseEnterDivMain,
    removedMessages,
    removeMessageInvoke,
    usersRoom,
  } = useChatFunctionsSocketIO({ router });

  if (
    Object.keys(router?.query).indexOf("userName") == -1 ||
    !router?.query?.userName ||
    !String(router?.query?.id).trim()
  ) {
    return <RedirectLogin />;
  }

  return (
    <>
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
            col-lg-8 col-md-8 col-sm-10 col-12
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
              // onMouseOver={() => setIsMouseEnterDivMain(true)}
              // onMouseLeave={() => setIsMouseEnterDivMain(false)}
              onScrollChatMessages={onScrollChatMessages}
              chatMessagesRef={chatMessagesRef}
            >
              <ChatRenderMessages
                messages={messages}
                message={message}
                userId={userId}
                setMessage={setMessage}
                onDragStartHandler={onDragStartHandler}
                onDragEndHandler={onDragEndHandler}
                removeMessage={removeMessageInvoke}
              />
            </ChatContentMessages>

            {/* buttons top down */}
            <ChatButtonsTopDown
              show={isMouseEnterDivMain}
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
    </>
  );
}
