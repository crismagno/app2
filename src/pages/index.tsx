import router from "next/router";
import { useState } from "react";
import Avatar from "../components/Avatar";
import { IWormState } from "../containers/Chat/functions/types";
import { ListRoomsSaved } from "../containers/Chat/ListRoomsSaved";
import { ELocalStorageItem } from "../shared/rooms-saved/enum";
import { IRoomSaved } from "../shared/rooms-saved/types";
import { ETypeChat, ETypeChatLabels } from "../utils/interfaces";
import { EColorChoose, WormBox } from "./../components/WormBox";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [typeChat, setTypeChat] = useState<ETypeChat>(ETypeChat.CHAT);
  const [load, setLoad] = useState<boolean>(false);
  const [wormState, setWormState] = useState<IWormState>({
    colorChoose: EColorChoose.white,
    show: false,
    text: "",
  });

  const wormBoxAction = (
    text: string,
    colorChoose: EColorChoose = EColorChoose.white,
    duration: number = 1
  ): void => {
    setWormState({
      show: true,
      text,
      colorChoose,
    });

    setTimeout(() => {
      setWormState({
        text: "",
        show: false,
        colorChoose,
      });
    }, duration * 1000);
  };

  const goToChatRoom = async (): Promise<void | never> => {
    try {
      setLoad(true);
      if (!userName.trim()) {
        throw new Error("Name User?");
      }
      if (!room.trim()) {
        throw new Error("Name Room?");
      }

      const createRoomSaved: IRoomSaved = {
        room,
        userName,
        avatar,
        typeChat,
        createdAt: new Date(),
      };

      const roomsSaved: IRoomSaved[] =
        JSON.parse(localStorage.getItem(ELocalStorageItem.ROOMS_SAVED)) || [];
      roomsSaved.push(createRoomSaved);
      localStorage.setItem(
        ELocalStorageItem.ROOMS_SAVED,
        JSON.stringify(roomsSaved)
      );

      if (typeChat === ETypeChat.CHAT) {
        router.push(`/chat/${room}?userName=${userName}&userAvatar=${avatar}`);
      }
      // if (typeChat == "video") {
      // router.push(`/video/${room}?userName=${userName}&userAvatar=${avatar}`);
      // }
    } catch (error: any) {
      wormBoxAction(error.message, EColorChoose.danger, 2);
    } finally {
      setLoad(false);
    }
  };

  const onKeyPress = (event: any): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      goToChatRoom();
    }
  };

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
      <ListRoomsSaved />
      <div
        className={`container d-flex flex-column justify-center align-items-center p-5`}
      >
        <div
          style={{ height: "85vh" }}
          className={`
            d-flex flex-column  justify-content-center
            w-100vw h-100vh
            col-lg-5 col-md-8 col-sm-10 col-12
        `}
        >
          <div className={`d-flex justify-content-center mb-3`}>
            <Avatar src={avatar} size={150} />
          </div>
          <div className={"d-flex"}>
            {Object.keys(ETypeChat).map(
              (eTypeChat: ETypeChat, index: number): JSX.Element => (
                <div key={`${index}-${eTypeChat}`} className="form-check mx-2">
                  <input
                    disabled={eTypeChat === ETypeChat.VIDEO}
                    className="form-check-input"
                    type="radio"
                    id={`for-${eTypeChat}`}
                    value="chat"
                    checked={typeChat === eTypeChat}
                    onChange={() => setTypeChat(eTypeChat)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`for-${eTypeChat}`}
                  >
                    {ETypeChatLabels[eTypeChat]}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Url avatar"
              onChange={(event) => setAvatar(event.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(event) => setUserName(event.target.value)}
              onKeyPress={onKeyPress}
              maxLength={30}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Room"
              onChange={(event) => setRoom(event.target.value)}
              onKeyPress={onKeyPress}
            />
          </div>
          <div className={"d-flex flex-column mt-2"}>
            <button
              disabled={load}
              className="btn bg-gradient-to-tr from-blue-500 to-blue-800 text-white shadow-none h-100px-4"
              onClick={goToChatRoom}
            >
              {!load ? (
                <>
                  Go to room <i className={"fa fa-running"}></i>
                </>
              ) : (
                <i className="spinner-border spinner-border-sm" role="status" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
