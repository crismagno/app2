import { useState } from "react";

export default function Test() {
  const [text, setText] = useState<string>("");

  return (
    <div
      className="
        flex flex-col justify-center items-center
        h-screen w-screen"
    >
      <h2 className="text-center">Text</h2>

      <span className="border-2 border-white max-w-md max-h-16 overflow-x-hidden p-3">
        {text}
      </span>

      <textarea
        className="rounded-lg text-black mt-4 p-1"
        cols={50}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
}
