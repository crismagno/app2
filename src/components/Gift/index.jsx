import React from 'react'
import styles from "../../styles/Gift.module.css";
export default () => {
    return (
        <div className={styles.gift}>
            <div className={styles["gift-lid"]}></div>
            <div className={styles["gift-box"]}>
                <div className={styles["gift-fillet-1"]}></div>
                <div className={styles["gift-fillet-2"]}></div>
            </div>
        </div>
    )
}
