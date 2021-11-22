import { useRouter } from "next/router";
import React from "react";

export const ChatHeader: React.FC = (): JSX.Element => {
  const router = useRouter();
  return (
    <div onClick={() => router?.back()} className={"w-100 my-2 mx-0 px-2 "}>
      <button className={"btn btn-outline-light "}>{"Back"}</button>
    </div>
  );
};

export default ChatHeader;
