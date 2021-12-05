import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useRouter } from "next/router";
import io, { Socket } from "socket.io-client";

// const videoConstraints = {
//     height: window.innerHeight / 2,
//     width: window.innerWidth / 2
// };

export default function Video() {
  const router = useRouter();

  const [peers, setPeers] = useState([]);
  const socketRef = useRef<Socket>(null);
  const userVideo = useRef(null);
  const peersRef = useRef(null);
  const roomID = useRef(null);

  useEffect(() => {
    // if (!!router.query.id) {
    roomID.current = router.query.id;
    socketRef.current = io("http://localhost:3004/", {
      // transports: ['websocket'],
      // forceNew: true,
      // reconnectionDelay: 1000,
      // reconnectionDelayMax: 10000,
      // reconnection: true,
      // multiplex: false,
    });
    socketRef.current.on("connect", () => {
      console.log("socket connection");
    });
    socketRef.current.on("disonnect", (data) => {
      console.log("socket desconnected");
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", 10);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users?.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current?.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current?.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current?.find((p) => p.peerID == payload.id);
          item?.peer.signal(payload.signal);
        });
      });
    // }
  }, [router?.query?.id]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef?.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef?.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function generateRandom() {
    return String(Date.now() + Math.floor(Math.random() * 100000000000 + 10));
  }

  return (
    <div
      className={`d-flex flex-column align-items-center border`}
      style={{ width: "100%", height: "100vh" }}
    >
      <span>Eu</span>
      <div className={"border"} style={{ width: 200, height: 180 }}>
        <video
          playsInline
          muted
          ref={userVideo}
          autoPlay
          style={{ width: "100%", height: "100%" }}
        ></video>
      </div>
      {peers.map((peer, index) => {
        return <ComponentVideo key={index} peer={peer} />;
      })}
    </div>
  );
}

const ComponentVideo = (props: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return (
    <div className={"border"} style={{ width: 400, height: 280 }}>
      <video
        playsInline
        muted
        ref={ref}
        autoPlay
        style={{ width: "100%", height: "100%" }}
      ></video>
    </div>
  );
};
