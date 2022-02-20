import Link from "next/link";
import React, { memo } from "react";

export const RedirectLogin: React.FC<any> = (): JSX.Element => {
  return (
    <div
      style={{ height: "100vh" }}
      className={"d-flex flex-column justify-content-center align-items-center"}
    >
      <Link href={"/"} passHref>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Link>
    </div>
  );
};

export default memo(RedirectLogin);
