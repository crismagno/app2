import { useRouter } from "next/router";

export const ChatHeader = (props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router?.back()}
      className={"d-flex justify-content-end"}
      style={{ position: "absolute", top: 10, left: 10 }}
    >
      <button className={"btn btn-outline-light "}>{"Voltar"}</button>
    </div>
  );
};

export default ChatHeader;
