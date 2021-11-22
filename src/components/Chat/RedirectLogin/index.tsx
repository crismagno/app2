import Link from "next/link";
import React, { memo } from "react";

export const RedirectLogin: React.FC<any> = (): JSX.Element => {
  return (
    <div
      style={{ height: "100vh" }}
      className={"d-flex flex-column justify-content-center align-items-center"}
    >
      <Link href={"/login"}>
        <button className={"btn btn-secondary btn-lg"}>Ir para login</button>
      </Link>
    </div>
  );
};

export default memo(RedirectLogin);
