import React, { useEffect, useState } from "react";
import { ShowTime } from "../ShowTimeComponent/ShowTime.component";
import { StartStopButton } from "../StartStopButtonComponent/StartStopButton.component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timerReducer";

import styles from "./Time.module.css";

export const TimerComponent = () => {

    const dispatch = useDispatch();
    const changeTimer = useSelector(state => state.timer.startStopButton);
    const time = useSelector(state => state.timer.time);

    useEffect(() => {
        let interval = null;
        if (changeTimer === true) {
            interval = setTimeout(() => { if (time > 0) { dispatch(timerActions.changeTime()) }; clearTimeout(interval) }, 1000);
        } else if (changeTimer === false) {
            clearTimeout(interval);
        }
        return () => { clearTimeout(interval) }; //Сброс эффекта
    }, [time, changeTimer, dispatch]);

    return (
        <div className={styles.mainTimeBlock}>
            <ShowTime className={styles.timer} timer={time} ></ShowTime>
            <StartStopButton className={styles.button}></StartStopButton>
        </div>
    )
}