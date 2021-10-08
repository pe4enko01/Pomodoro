import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { timerActions } from "../../store/timerReducer";

import useSound from 'use-sound';
import boopSfx from '../Task/sm-music-harp-1.mp3';

import styles from './Task.module.css';

export const Task = (props) => {
    const dispatch = useDispatch();
    const [time, setComponentTimer] = useState(1500);

    const changeTimer = props.buttonStartTimer;
    const pomodoroMode = useSelector(state => state.timer.pomodoroBreakState);
    //const fdfs = useSelector(state => state.timer.pomodoroBreakState);

    const skipTimer = props.propskipTimer;

    const stateOfPomodoroSkipStateButton = useSelector(state => state.timer.checkStateOfPomodoroSkipStateButton);
    const [play] = useSound(boopSfx);





    useEffect(() => {
        let interval = null;


        if (changeTimer === true) {
            interval = setTimeout(() => {

                if (time > 0) {
                    setComponentTimer(time => time - 1);
                    dispatch(timerActions.setTimer(time));
                    if (skipTimer == "Breake" && stateOfPomodoroSkipStateButton == "none") {
                        dispatch(timerActions.selectBreackMode());
                        dispatch(timerActions.setTimer(300))
                        setComponentTimer(300);
                        dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
                        dispatch(timerActions.setStart());
                        dispatch(addTaskActions.buttonStartTimerToFalse());
                        dispatch(timerActions.togglestartStopButton());

                    } else if (skipTimer == "Pomodoro" && stateOfPomodoroSkipStateButton == "none2") {
                        dispatch(timerActions.setStart());
                        dispatch(timerActions.selectPomodoroMode());
                        dispatch(timerActions.setTimer(1500));
                        dispatch(timerActions.togglestartStopButton());
                        //dispatch(addTaskActions.donePomodorosAddToArr());
                        setComponentTimer(1500);
                        dispatch(addTaskActions.pomodoroCheckToFalse());
                        dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
                        dispatch(addTaskActions.buttonStartTimerToFalse());
                        if (props.propsdonePomodoros + 1 == props.countOfPomodoros) {
                            dispatch(addTaskActions.taskIsDone());
                            dispatch(addTaskActions.uncheckPomodor(props.taskKey));
                        };

                    }
                };

                if (time === 0 && pomodoroMode === true) {
                    setComponentTimer(300);
                    dispatch(timerActions.setTimer(300));
                    dispatch(timerActions.selectBreackMode());
                    dispatch(addTaskActions.buttonStartTimerToggle());
                    dispatch(timerActions.setStart());
                    dispatch(timerActions.togglestartStopButton());

                    play();

                };
                if (time === 0 && pomodoroMode === false) {
                    dispatch(timerActions.setStart());
                    dispatch(timerActions.selectPomodoroMode());
                    dispatch(timerActions.setTimer(1500));
                    dispatch(timerActions.togglestartStopButton());
                    dispatch(addTaskActions.donePomodorosAddToArr());
                    setComponentTimer(1500);
                    dispatch(addTaskActions.pomodoroCheckToFalse());
                    if (props.propsdonePomodoros + 1 == props.countOfPomodoros) {
                        dispatch(addTaskActions.taskIsDone());
                        dispatch(addTaskActions.checkPomodor(props.taskKey));
                    };
                    dispatch(timerActions.togglestartStopButton());
                    play();
                    clearTimeout(interval)

                };
                //clearTimeout(interval)
            }
                , 1);
        }

        else if (changeTimer === false && skipTimer == "Breake" && stateOfPomodoroSkipStateButton === "none") {

            dispatch(timerActions.selectBreackMode());
            dispatch(timerActions.setTimer(300))
            setComponentTimer(300);
            dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
            //dispatch(addTaskActions.setPonodoroOnState()); 
            dispatch(timerActions.setStart());

            dispatch(addTaskActions.buttonStartTimerToFalse());
            dispatch(timerActions.togglestartStopButton());
            clearTimeout(interval);
        }
        else if (changeTimer === false && skipTimer == "Pomodoro" && stateOfPomodoroSkipStateButton === "none2") {
            dispatch(timerActions.setStart());
            dispatch(timerActions.selectPomodoroMode());
            dispatch(timerActions.setTimer(1500));
            dispatch(timerActions.togglestartStopButton());
            dispatch(addTaskActions.donePomodorosAddToArr());
            setComponentTimer(1500);
            dispatch(addTaskActions.pomodoroCheckToFalse());
            if (props.propsdonePomodoros + 1 == props.countOfPomodoros) {
                dispatch(addTaskActions.taskIsDone());
                dispatch(addTaskActions.uncheckPomodor(props.taskKey));
            };
            dispatch(timerActions.togglestartStopButton());
            //console.log(stateOfPomodoroSkipStateButton);
            dispatch(addTaskActions.buttonStartTimerToFalse());
            dispatch(timerActions.checkStateOfPomodoroSkipState("none"));


            clearTimeout(interval);
        }
        // else if (changeTimer === false && skipTimer == "Pomodoro") {
        //     clearTimeout(interval);
        // }



        return () => { clearTimeout(interval) }; //Сброс эффекта
    }, [time, changeTimer, skipTimer, dispatch]);



    const deleteTaskHendler = () => {
        dispatch(addTaskActions.deleteTask(props.taskKey));
        dispatch(timerActions.setStart());
        dispatch(timerActions.setTimer(1500));
        dispatch(timerActions.selectPomodoroMode());
    };

    const startButtonInfo = useSelector(state => state.timer.startButtonInfo);
    const checkPomodoroHendler = () => {
        dispatch(timerActions.toggleStartButtonfromTask(props.checPomodoroProp));
        dispatch(timerActions.showButtonInfo());
        dispatch(addTaskActions.checkPomodor(props.taskKey));
        dispatch(timerActions.setTimer(time));
    };

    return (
        <div>

            {
                !props.propTaskiIsDone && (
                    <div className={props.checPomodoroProp ? styles.taskContainerCheck : styles.taskContainer} onClick={checkPomodoroHendler}>
                        <div className={props.propTaskiIsDone ? styles.taskTextDone : styles.taskText}>
                            {props.items}
                        </div>
                        <div className={styles.countOfPomodoros}>
                            {props.propsdonePomodoros}/{props.countOfPomodoros}-
                            {time}
                        </div>
                    </div>
                )}
            {
                props.propTaskiIsDone && (
                    <div className={styles.taskContainerDone}>
                        <div className={props.propTaskiIsDone ? styles.taskTextDone : styles.taskText}>
                            {props.items}
                        </div>
                        <div className={styles.countOfPomodoros}>
                            {props.propsdonePomodoros}/{props.countOfPomodoros}-
                            {time}
                        </div>
                    </div>
                )
            }

            <div className={styles.deleteButtonContainer}>
                <button className={styles.deleteTaskBtton} onClick={deleteTaskHendler}>Удалить</button>
            </div>
        </div>

    )
}