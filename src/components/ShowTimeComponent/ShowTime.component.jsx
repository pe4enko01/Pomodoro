import React from "react";
import styles from './ShowTime.module.css';

export const ShowTime = (props) => {
    const { timer } = props;

    return (
        <div className={styles.timer}>
            {(timer / 60 % 60) > 10 ? Math.floor(timer / 60 % 60) : `${"0" + Math.floor(timer / 60 % 60)}`}
            :
            {(timer % 60) > 10 ? Math.floor(timer % 60) : `${"0" + Math.floor(timer % 60)}`}
        </div>
    )
}