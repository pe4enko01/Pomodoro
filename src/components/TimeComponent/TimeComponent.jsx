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
        if(stateOfPomodoroSkipStateButton == "Pomodoro"){
            dispatch(addTaskActions.skipTimer());
        }else if(stateOfPomodoroSkipStateButton == "Breake"){
            dispatch(addTaskActions.setPonodoroOnState());   
        }else if(stateOfPomodoroSkipStateButton == "none"){
            dispatch(addTaskActions.skipTimer());   
        }
        else if(stateOfPomodoroSkipStateButton == "none2"){
            dispatch(addTaskActions.setPonodoroOnState()); 
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
                <button className={styles.pomodorocheckButton} onClick={selectPomodoroMod}>Помодоро</button>
                <button className={styles.breakecheckButton} onClick={selectBreackMod}>Перерыв</button>
            </div>
            <ShowTime className={styles.timer} timer={time} ></ShowTime>
            <StartStopButton className={styles.button}></StartStopButton>
            <button className={styles.skipButtonClass} onClick={PomodoroTimerHendler}>П</button>
           
        </div>
    )
}