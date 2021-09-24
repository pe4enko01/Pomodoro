import React, { useEffect, useState } from "react";
import { ShowTime } from "../ShowTimeComponent/ShowTime.component";
import { StartStopButton } from "../StartStopButtonComponent/StartStopButton.component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timerReducer";
import { addTaskActions } from "../../store/addTaskReducer";


import styles from "./Time.module.css";

export const TimerComponent = () => {

    const dispatch = useDispatch();
    const changeTimer = useSelector(state => state.timer.startStopButton);
    const timeOfPomodoro = useSelector(state => state.addTask.pomodoroTime);
    // dispatch(timerActions.setTimer(timeOfPomodoro));
    const time = useSelector(state => state.timer.time);
    console.log(time);

    // useEffect(() => {
    //     let interval = null;
    //     if (changeTimer === true) {
    //         interval = setTimeout(() => { if (time > 0) { dispatch(addTaskActions.setTimerOfPomodoro(time)); dispatch(timerActions.changeTime()); }; clearTimeout(interval) }, 100);
    //     } else if (changeTimer === false) {
    //         clearTimeout(interval);
    //     }
    //     return () => { clearTimeout(interval) }; //Сброс эффекта
    // }, [time, changeTimer, dispatch]);

    return (
        <div className={styles.mainTimeBlock}>
            <ShowTime className={styles.timer} timer={time} ></ShowTime>
            <StartStopButton className={styles.button}></StartStopButton>
        </div>
    )
}