import { useRouter } from "next/router";
import ChatTop from "./../../components/Chat/Top";
import RedirectLogin from "./../../components/Chat/RedirectLogin";
import ChatHeader from "./../../components/Chat/Header";
import ChatContentMessages from "./../../components/Chat/ContentMessages";
import ChatTextarea from "./../../components/Chat/Textarea";
import ChatEmojiPicker from "./../../components/Chat/EmojiPicker";
import ChatRemoveMessage from "./../../components/Chat/RemoveMessage";
import ChatButtonsTopDown from "./../../components/Chat/ButtonsTopDown";
import { ChatRenderMessages } from "../../components/Chat/RenderMessages";
import { WormBox } from "../../components/General/WormBox";
import { useChatFunctionsSocketIO } from "../../components/Chat/functions/useChatFunctionsSocketIO";

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
        animation="slideInUp"
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
          <div className={`col-4`}>test</div>

          <div
            className="
            d-flex flex-column justify-content-center 
            col-lg-8 col-md-8 col-sm-10 col-12
          "
            style={{ height: "100vh", position: "relative" }}
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
