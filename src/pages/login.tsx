import router from "next/router";
import { useState } from "react";
import { Avatar } from "../components/General/Avatar";
import { IconChatAlt } from "./../components/General/icons";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [type, setType] = useState<"chat" | "video">("chat");

  const goToChatRoom = () => {
    if (!userName?.trim() || !room.trim()) {
      return alert("Inform nome e sala...");
    }

    if (type == "chat") {
      router.push(`/chat/${room}?userName=${userName}&userAvatar=${avatar}`);
    }
    if (type == "video") {
      // router.push(`/video/${room}?userName=${userName}&userAvatar=${avatar}`);
    }
  };

  return (
    <div className={`container d-flex flex-column align-items-center `}>
      <div
        style={{ height: "100vh" }}
        className={`
            d-flex flex-column  justify-content-center
            w-100vw h-100vh
            col-lg-6 col-md-8 col-sm-10 col-12
        `}
      >
        <div className={`d-flex justify-content-center mb-3`}>
          <Avatar src={avatar} size={150} />
          {/* {avatar ? (
            <img
              src={avatar}
              alt={"user avatar"}
              className={`border-1 rounded-full mr-1 shadow`}
              style={{
                width: 150,
                height: 150,
                borderColor: "#FFF5",
                objectFit: "cover",
              }}
            />
          ) : (
            IconChatAlt(40)
          )} */}
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
            />
            <label className="form-check-label" htmlFor="gridRadios2">
              <span className={"mx-2"}>Video</span>
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Avatar</label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert url avatar on call"
            onChange={(event) => setAvatar(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert name on call"
            onChange={(event) => setUserName(event.target.value)}
            maxLength={30}
          />
        </div>
        <div className="form-group mt-2">
          <label>Sala</label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert room of call"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <div className={"d-flex flex-column "}>
          <button
            className="btn btn-primary mt-2 shadow-none h-100px-4"
            onClick={goToChatRoom}
          >
            Ir para a sala <i className={"fa fa-running"}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
