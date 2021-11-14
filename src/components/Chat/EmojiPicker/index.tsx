import {Animated} from "react-animated-css";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

interface ChatEmojiPickerProps {
    isVisiblePicker: boolean;
    pickerOnClick: (emoji: any, event: any) => void
}

export const ChatEmojiPicker: React.FC<ChatEmojiPickerProps> = (props): JSX.Element => {
    return (
        <Animated
          animationIn={"fadeIn"} 
          animationOut="fadeOut" 
          animationInDelay={500}
          animationInDuration={500}
          animationOutDuration={500}
          isVisible={props.isVisiblePicker}
        >
          <div className={`view-picker`}>
            <Picker 
              autoFocus={true}
              theme={"auto"}
              color={"#0D6EFD"}
              set={"google"}
              i18n={{
                search: "Buscando...",
                categories: {
                  search: 'Buscar',
                  recent: 'Recentes',
                  smileys: 'Sorrisos',
                  people: 'Pessoas',
                  nature: 'Natureza',
                  foods: 'Comidas e Bebidas',
                  activity: 'Atividade',
                  places: 'Viagens e Lugares',
                  objects: 'Objetos',
                  symbols: 'Simbolos',
                  flags: 'Bandeiras',
                  custom: 'Customizados',
                }
              }}
              onClick={props.pickerOnClick}
            />
          </div>
        </Animated>
    )
}

export default ChatEmojiPicker;