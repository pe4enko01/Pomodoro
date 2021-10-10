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
    const stateOfPomodoroSkipStateButton = useSelector(state => state.timer.checkStateOfPomodoroSkipStateButton);
    const timeOfPomodoro = useSelector(state => state.addTask.pomodoroTime);
    // dispatch(timerActions.setTimer(timeOfPomodoro));
    const time = useSelector(state => state.timer.time);
    const skipOnButton = useSelector(state => state.addTask.taskState);
    const taskState = useSelector(state => state.timer.pomodoroBreakState);


    const selectPomodoroMod = () => {
        dispatch(timerActions.selectPomodoroMode());
    }

    const selectBreackMod = () => {
        dispatch(timerActions.selectBreackMode());
    }
    const skipTimerHendler = () => {
        dispatch(addTaskActions.skipTimer());
    }
    const PomodoroTimerHendler = () => {

        if (stateOfPomodoroSkipStateButton == "none") {
            dispatch(addTaskActions.setBreakeClickTask());
            
        }
        else if (stateOfPomodoroSkipStateButton == "none2") {
            dispatch(addTaskActions.setPonodoroClickTask());
        }
    }

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
            <div className={styles.pomodoroBreakeButtonsContainer}>
                <div className={taskState === true ? styles.pomodorocheckButton : "none"} >Помодоро</div>
                <div className={taskState === false ? styles.breakecheckButton : "none"}  >Перерыв</div>
            </div>
            <ShowTime className={styles.timer} timer={time} ></ShowTime>
            <div className={styles.StartButtonAndSkippButtonContainer}>
                <StartStopButton ></StartStopButton>
                <button className={styles.skipButtonClass} onClick={PomodoroTimerHendler}>▶▶</button>
            </div>

        </div>
    )
}