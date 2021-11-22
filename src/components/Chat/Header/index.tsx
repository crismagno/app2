import { useRouter } from "next/router";
import React from "react";

export const ChatHeader: React.FC = (): JSX.Element => {
  const router = useRouter();
  return (
    <div
      onClick={() => router?.back()}
      className={"d-flex justify-content-end"}
      style={{ position: "absolute", top: 10, left: 10 }}
    >
      <button className={"btn btn-outline-light "}>{"Back"}</button>
    </div>
  );
};

export default ChatHeader;
