import { Animated } from "react-animated-css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

interface IChatEmojiPickerProps {
  isVisiblePicker: boolean;
  pickerOnClick: (emoji: any, event: any) => void;
}

export const ChatEmojiPicker: React.FC<IChatEmojiPickerProps> = ({
  isVisiblePicker,
  pickerOnClick,
}): JSX.Element => {
  return (
    <Animated
      animationIn="zoomIn"
      animationOut="zoomOut"
      isVisible={isVisiblePicker}
      animationInDuration={300}
      animationOutDuration={300}
    >
      <div className={`view-picker`}>
        <Picker
          autoFocus={true}
          theme={"auto"}
          color={"#0D6EFD"}
          set={"google"}
          i18n={{
            search: "Buscando",
            categories: {
              search: "Buscar",
              recent: "Recentes",
              smileys: "Sorrisos",
              people: "Pessoas",
              nature: "Natureza",
              foods: "Comidas e Bebidas",
              activity: "Atividade",
              places: "Viagens e Lugares",
              objects: "Objetos",
              symbols: "Simbolos",
              flags: "Bandeiras",
              custom: "Customizados",
            },
          }}
          onClick={pickerOnClick}
        />
      </div>
    </Animated>
  );
};

export default ChatEmojiPicker;
