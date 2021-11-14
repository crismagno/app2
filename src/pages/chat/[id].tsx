//  PARA RODAR O BACKEND TEM UQE CHAMAR ALGUMA ROTA DA API !!!!!!!!!!!!!!!!!
import { useRouter } from "next/router";
import ChatTop from "./../../components/Chat/Top";
import RedirectLogin from "./../../components/Chat/RedirectLogin";
import ChatHeader from "./../../components/Chat/Header";
import ChatContentMessages from "./../../components/Chat/ContentMessages";
import ChatTextarea from "./../../components/Chat/Textarea";
import ChatEmojiPicker from "./../../components/Chat/EmojiPicker";
import ChatRemoveMessage from "./../../components/Chat/RemoveMessage";
import ChatButtonsTopDown from "./../../components/Chat/ButtonsTopDown";
import {
  ChatRenderMessages,
} from "../../components/Chat/RenderMessages";
import { WormBox } from "../../components/General/WormBox";
import { UseChatFunctions } from "../../components/Chat/functions/useChatFuncitons";

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
    pickerOnClick
  } = UseChatFunctions({router});
  
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
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <ChatHeader />

        <div
          className="
          position-relative
          d-flex flex-column justify-content-center 
          col-lg-8 col-md-8 col-sm-10 col-12"
          style={{ height: "100vh" }}
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
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
            />
          </ChatContentMessages>

          {/* div remove */}
          <ChatRemoveMessage
            isDragMessage={isDragMessage}
            isDragOverRemove={isDragOverRemove}
            onDropHandler={onDropHandler}
            onDragOverHandler={onDragOverHandler}
            onDragDropLeaveHandler={onDragDropLeaveHandler}
          />

          {/* buttons top down */}
          <ChatButtonsTopDown
            positionScrollChatMessages={positionScrollChatMessages}
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
    </>
  );
}
