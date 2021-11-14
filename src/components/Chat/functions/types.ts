import { NextRouter } from "next/router";
import { IWormBoxProps } from "../../General/WormBox";

export interface IWormState {
    text: string;
    show: boolean;
    colorChoose: IWormBoxProps["colorChoose"];
};


export interface IUseChatFunctions {
    router: NextRouter
}