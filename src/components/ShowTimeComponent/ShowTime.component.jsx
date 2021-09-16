import React from "react";
import styles from './ShowTime.module.css';

export const ShowTime = (props) => {
    const { timer } = props;

    return (
        <p className={styles.timer}>
            {(timer / 60 % 60) > 9 ? Math.floor(timer / 60 % 60) : `${"0" + Math.floor(timer / 60 % 60)}`}
            :
            {(timer % 60) > 9 ? Math.floor(timer % 60) : `${"0" + Math.floor(timer % 60)}`}
        </p>
    )
}