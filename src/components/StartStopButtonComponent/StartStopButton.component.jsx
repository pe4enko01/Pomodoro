import React from "react";
import styles from './StartStopButton.module.css';

export const StartStopButton = (props) => {

    

    return (
        <button className={styles.button} onClick={props.startStopHendlerProps}>{props.children}</button>
    )
}