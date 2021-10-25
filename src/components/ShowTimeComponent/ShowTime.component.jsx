import React from "react";
import styles from './ShowTime.module.css';

import { useSelector } from "react-redux";

export const ShowTime = () => {

    const timer = useSelector(state => state.timer.time);

    return (
        <div className={styles.timer}>
            {(timer / 60 % 60) >= 10 ? Math.floor(timer / 60 % 60) : `${"0" + Math.floor(timer / 60 % 60)}`}
            :
            {(timer % 60) >= 10 ? Math.floor(timer % 60) : `${"0" + Math.floor(timer % 60)}`}
        </div>
    )
}