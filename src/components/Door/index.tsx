import React from 'react'
import DoorModel from '../../model/Door';
import styles from "../../styles/Door.module.css";
import Gift from '../Gift';

interface IDoorProps {
    value: DoorModel;
    onChange: (newDoorModel: DoorModel) => void;
}

export default (props: IDoorProps) => {
    const door = props.value
    const isSelected = door.isSelected && !door.isOpened ? styles.selected : ""

    const onChangeNewDoorModel = e => {
        e.stopPropagation()
        props.onChange(door.toggleSelected())
    }
    const onOpenDoor = e => {
        e.stopPropagation()
        props.onChange(door.open())
    }

    return (
        <div className={`${styles.area}`} onClick={onChangeNewDoorModel}>
            <div className={`${styles.structure} ${isSelected}`}>
                {
                    !door.isOpened ?
                    <div className={styles.door}>
                        <div className={styles.doorNumber}>{door.number}</div>
                        <div className={styles.doorHandler} onClick={onOpenDoor}></div>
                    </div> : door.hasGift ? <Gift /> : false
                }
            </div>
            <div className={styles.doorFloor}></div>
        </div>
    )
}
