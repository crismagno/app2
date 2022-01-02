import { NextRouter, useRouter } from "next/router";
import { memo } from "react";
import RedirectLogin from "../RedirectLogin";

interface IChatAuthProps {
  children?: JSX.Element[];
}

export const ChatAuth: React.FC<IChatAuthProps> = ({
  children,
}): JSX.Element => {
  const router: NextRouter = useRouter();

  if (
    Object.keys(router?.query).indexOf("userName") == -1 ||
    !router?.query?.userName ||
    !String(router?.query?.id).trim()
  ) {
    return <RedirectLogin />;
  }

  return <>{children}</>;
};

export default memo(ChatAuth);
