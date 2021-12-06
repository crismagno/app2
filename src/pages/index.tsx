import router from "next/router";
import { useState } from "react";
import Avatar from "../components/Avatar";
import { IWormState } from "../containers/Chat/functions/types";
import { IWormBoxProps, WormBox } from "./../components/WormBox";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [type, setType] = useState<"chat" | "video">("chat");
  const [wormState, setWormState] = useState<IWormState>({
    colorChoose: "white",
    show: false,
    text: "",
  });

  const wormBoxAction = (
    text: string,
    colorChoose: IWormBoxProps["colorChoose"] = "white",
    duration: number = 1000
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
    }, duration);
  };

  const goToChatRoom = (): void => {
    if (!userName?.trim()) {
      return wormBoxAction("Name User?", "danger", 2000);
    }
    if (!room.trim()) {
      return wormBoxAction("Name Room?", "danger", 2000);
    }

    if (type == "chat") {
      router.push(`/chat/${room}?userName=${userName}&userAvatar=${avatar}`);
    }
    if (type == "video") {
      // router.push(`/video/${room}?userName=${userName}&userAvatar=${avatar}`);
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
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                id="gridRadios1"
                value="chat"
                checked={type == "chat"}
                onChange={() => setType("chat")}
              />
              <label className="form-check-label" htmlFor="gridRadios1">
                Chat
              </label>
            </div>
            <div className="htmlForm-check">
              <input
                className="form-check-input"
                type="radio"
                id="gridRadios2"
                value="video"
                checked={type == "video"}
                onChange={() => setType("video")}
                disabled
              />
              <label className="form-check-label" htmlFor="gridRadios2">
                <span className={"mx-2"}>Video</span>
              </label>
            </div>
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
              maxLength={30}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name room"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <div className={"d-flex flex-column mt-2"}>
            <button
              className="btn btn-primary shadow-none h-100px-4"
              onClick={goToChatRoom}
            >
              Go to room <i className={"fa fa-running"}></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
