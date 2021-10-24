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
    console.log(stateOfPomodoroSkipStateButton);
    const timeOfPomodoro = useSelector(state => state.addTask.pomodoroTime);
    // dispatch(timerActions.setTimer(timeOfPomodoro));
    const PomodoroTimer = useSelector((state => state.timer.setTimerOfPomodoro)) * 60;
    const timer = useSelector(state => state.timer.time);
    const skipOnButton = useSelector(state => state.addTask.taskState);
    const taskState = useSelector(state => state.timer.pomodoroBreakState);
    
    // useEffect(() => {
    //     dispatch(timerActions.setTimer(PomodoroTimer));
    // },[PomodoroTimer]);
    useEffect(()=>{
        dispatch(timerActions.setTimer(localStorage.getItem('pomodoroTime')));
    },[])
   //Извлечение массива с тасками в localStorage
   useEffect(()=>{     
       const lol = localStorage.getItem('arr')
       if(lol){
           dispatch(addTaskActions.addLocalStorageToArr(lol))
       }
    },[]);
    
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
        dispatch(timerActions.changeHelper());
        
    }
    const infinitMode = useSelector((state => state.header.infinitMod));
    const [time, setComponentTimer] = useState(1500);
    
    // if(infinitMode){
    //     let interval = null;

    //     if (changeTimer === true) {
    //         if (time > 0) {
    //             setComponentTimer(time => time - 1);

                
    //             dispatch(timerActions.setTimer(time));
    //             if (skipTimer == "Breake" && stateOfPomodoroSkipStateButton == "none") {

    //                 dispatch(timerActions.selectBreackMode());
    //                 localStorage.setItem('selectMode', "breake");
    //                 dispatch(timerActions.setTimer(BreakeTimerSelector));
    //                 setComponentTimer(BreakeTimerSelector);
    //                 dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
    //                 dispatch(timerActions.setStart());
    //                 dispatch(addTaskActions.buttonStartTimerToFalse());
    //                 dispatch(timerActions.togglestartStopButton());
    //                 dispatch(timerActions.changeHelperFalse());


    //             } else if (skipTimer == "Pomodoro" && stateOfPomodoroSkipStateButton == "none2") {
    //                 //dispatch(addTaskActions.setPomodoroTime({ key: props.taskKey, time: st }));
    //                 console.log("fgdfhtfhfgh");
    //                 dispatch(timerActions.setStart());
    //                 dispatch(timerActions.selectPomodoroMode());
    //                 localStorage.setItem('selectMode', "pomodoro");
    //                 dispatch(timerActions.setTimer(PomodoroTimer));
    //                 dispatch(timerActions.togglestartStopButton());
    //                 dispatch(addTaskActions.donePomodorosAddToArr());
    //                 setComponentTimer(PomodoroTimer);
    //                 dispatch(addTaskActions.pomodoroCheckToFalse());
    //                 dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
    //                 dispatch(addTaskActions.buttonStartTimerToFalse());
    //                 if (props.propsdonePomodoros + 1 == props.countOfPomodoros) {
    //                     dispatch(addTaskActions.taskIsDone());
    //                     dispatch(addTaskActions.uncheckPomodor(props.taskKey));
    //                 };
    //                 dispatch(timerActions.changeHelperFalse());

    //             }
    //         }
    //     }
    // }
    return (
        <div className={styles.mainTimeBlock}>
            <div className={styles.pomodoroBreakeButtonsContainer}>
                <div className={taskState === true ? styles.pomodorocheckButton : "none"} >Помодоро</div>
                <div className={taskState === false ? styles.breakecheckButton : "none"}  >Перерыв</div>
            </div>
            <ShowTime className={styles.timer} timer={timer} ></ShowTime>
            <div className={styles.StartButtonAndSkippButtonContainer}>
                <StartStopButton ></StartStopButton>
                <button className={styles.skipButtonClass} onClick={PomodoroTimerHendler}>▶▶</button>
            </div>

        </div>
    )
}