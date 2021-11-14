// import stylesWormBox from "./WormBox.module.scss";
import styleAnimation from "./Animation.module.scss";

export interface IWormBoxProps {
    className?: string;
    text?: string | number;
    icon?: JSX.Element;
    colorChoose?: "white" | "warning" | "danger" | "success" | "dark";
    animation?: "fadeIn" | "slideInUp" | "slideInDown"
}

export const WormBox: React.FC<IWormBoxProps> = (props): JSX.Element => {

    const styleChoose = () => {
        switch(props?.colorChoose) {
            case "white": return "bg-gradient-to-tr from-white to-gray-50 text-gray-800";
            case "warning": return "bg-gradient-to-tr from-yellow-400 to-yellow-500 text-white";
            case "danger": return "bg-gradient-to-tr from-red-400 to-red-500 text-white";
            case "success": return "bg-gradient-to-tr from-green-500 to-green-700 text-white";
            case "dark": return "bg-gradient-to-tr from-gray-800 to-gray-900 text-white";
        }; 
    }
    
    return (
        <div className={`
            flex justify-start items-center px-4 py-2 
            min-h-0 w-96 max-h-96
            ${styleChoose()}
            text-base
            z-10
            rounded-md
            shadow-2xl
            ${styleAnimation[props?.animation ?? "fadeIn"]}
            ${props?.className}
        `}>
            <span className={`mr-4`}>
                {props?.icon}
            </span>
            <span>
                {props?.text}                
            </span>
        </div>
    )
};

export default WormBox;