import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { timerActions } from "../../store/timerReducer";

import useSound from 'use-sound';
import boopSfx1 from '../Task/sm-music-harp-1.mp3';
import boopSfx2 from '../Task/2.mp3';
import boopSfx3 from '../Task/3.mp3';

import styles from './Task.module.css';

export const Task = (props) => {
    const PomodoroTimer = useSelector((state => state.timer.setTimerOfPomodoro)) * 60;
    const BreakeTimerSelector = useSelector((state => state.timer.setBreakeOfPomodoro)) * 60;
    const soundCheck = useSelector((state => state.header.soundCheck));

    const dispatch = useDispatch();
    const [time, setComponentTimer] = useState(PomodoroTimer);
    const [BreakeTimer, setBreakeTimer] = useState(BreakeTimerSelector);

    const changeTimer = props.buttonStartTimer;
    const pomodoroMode = useSelector(state => state.timer.pomodoroBreakState);
    const skipstatic = useSelector(state => state.timer.skipstatic);

    //const fdfs = useSelector(state => state.timer.pomodoroBreakState);

    const skipTimer = props.propskipTimer;

    const stateOfPomodoroSkipStateButton = useSelector(state => state.timer.checkStateOfPomodoroSkipStateButton);
    const [play1] = useSound(boopSfx1);
    const [play2] = useSound(boopSfx2);
    const [play3] = useSound(boopSfx3);
 

    useEffect(() => {
        let interval = null;


        if (changeTimer === true) {
            interval = setTimeout(() => {


                if (time > 0) {
                    setComponentTimer(time => time - 1);
                    dispatch(timerActions.setTimer(time));
                    if (skipTimer == "Breake" && stateOfPomodoroSkipStateButton == "none") {
                        dispatch(timerActions.selectBreackMode());
                        dispatch(timerActions.setTimer(BreakeTimer));
                        setComponentTimer(BreakeTimer);
                        dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
                        dispatch(timerActions.setStart());
                        dispatch(addTaskActions.buttonStartTimerToFalse());
                        dispatch(timerActions.togglestartStopButton());
                        dispatch(timerActions.changeHelperFalse());


                    } else if (skipTimer == "Pomodoro" && stateOfPomodoroSkipStateButton == "none2") {
   
                        dispatch(timerActions.setStart());
                        dispatch(timerActions.selectPomodoroMode());
                        dispatch(timerActions.setTimer(PomodoroTimer));
                        dispatch(timerActions.togglestartStopButton());
                        //dispatch(addTaskActions.donePomodorosAddToArr());
                        setComponentTimer(PomodoroTimer);
                        dispatch(addTaskActions.pomodoroCheckToFalse());
                        dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
                        dispatch(addTaskActions.buttonStartTimerToFalse());
                        if (props.propsdonePomodoros + 1 == props.countOfPomodoros) {
                            dispatch(addTaskActions.taskIsDone());
                            dispatch(addTaskActions.uncheckPomodor(props.taskKey));
                        };
                        dispatch(timerActions.changeHelperFalse());

                    }
                }

                else if (time === 0 && pomodoroMode === true) {
                    setComponentTimer(BreakeTimer);
                    dispatch(timerActions.setTimer(BreakeTimer));

                    dispatch(timerActions.selectBreackMode());
                    dispatch(addTaskActions.buttonStartTimerToggle());
                    dispatch(timerActions.setStart());
                    dispatch(timerActions.togglestartStopButton());

                    dispatch(addTaskActions.setBreakeClickTask());
                    dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));

                    if(soundCheck == "1"){

                        play1();
                    }else if(soundCheck == "2"){
                        play2();
                    }else if(soundCheck == "3"){
                        play3();
                    }


                }
                else if (time === 0 && pomodoroMode === false) {
                    dispatch(timerActions.setStart());
                    dispatch(timerActions.selectPomodoroMode());
                    dispatch(timerActions.setTimer(PomodoroTimer));
                    dispatch(addTaskActions.donePomodorosAddToArr());
                    setComponentTimer(PomodoroTimer);
                    dispatch(addTaskActions.pomodoroCheckToFalse());
                    
                    if (props.propsdonePomodoros + 1 == props.countOfPomodoros) {
                        dispatch(addTaskActions.taskIsDone());
                        dispatch(addTaskActions.checkPomodor(props.taskKey));
                    };
                    dispatch(timerActions.togglestartStopButton());

                    dispatch(addTaskActions.setPonodoroClickTask());
                    dispatch(timerActions.checkStateOfPomodoroSkipState("none"));

                    if(soundCheck == "1"){

                        play1();
                    }else if(soundCheck == "2"){
                        play2();
                        console.log("fdsf");
                    }else if(soundCheck == "3"){
                        play3();
                    }
                    clearTimeout(interval);

                };
                //clearTimeout(interval)
            }
                , 1);
        }

        else if (changeTimer === false && skipTimer == "Breake" && stateOfPomodoroSkipStateButton === "none" && skipstatic) {

            dispatch(timerActions.selectBreackMode());
            dispatch(timerActions.setTimer(BreakeTimer));
            setComponentTimer(BreakeTimer);
            dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
            //dispatch(addTaskActions.setPomodoroOnState()); 
            dispatch(timerActions.setStart());

            dispatch(addTaskActions.buttonStartTimerToFalse());
            dispatch(timerActions.togglestartStopButton());
            dispatch(timerActions.changeHelperFalse());
            clearTimeout(interval);
        }
        else if (changeTimer === false && skipTimer == "Pomodoro" && stateOfPomodoroSkipStateButton === "none2" && skipstatic ) {
            console.log(skipTimer);
            console.log(stateOfPomodoroSkipStateButton);
            dispatch(timerActions.setStart());
            dispatch(timerActions.selectPomodoroMode());
            dispatch(timerActions.setTimer(PomodoroTimer));
            dispatch(timerActions.togglestartStopButton());
            dispatch(addTaskActions.donePomodorosAddToArr());
            setComponentTimer(PomodoroTimer);
            dispatch(addTaskActions.pomodoroCheckToFalse());
            if (props.propsdonePomodoros + 1 == props.countOfPomodoros) {
                dispatch(addTaskActions.taskIsDone());
                dispatch(addTaskActions.uncheckPomodor(props.taskKey));
            };
            dispatch(timerActions.togglestartStopButton());
            dispatch(addTaskActions.buttonStartTimerToFalse());

            dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
            dispatch(timerActions.changeHelperFalse());

            clearTimeout(interval);
        }
       



        return () => { clearTimeout(interval) }; //Сброс эффекта
    }, [time, changeTimer, skipTimer, dispatch]);



    const deleteTaskHendler = () => {
        dispatch(addTaskActions.deleteTask(props.taskKey));
        dispatch(timerActions.setStart());
        dispatch(timerActions.setTimer(PomodoroTimer));
        dispatch(timerActions.selectPomodoroMode());
    };

    const checkPomodoroHendler = () => {
        dispatch(timerActions.toggleStartButtonfromTask(props.checPomodoroProp));
        dispatch(timerActions.showButtonInfo());
        dispatch(addTaskActions.checkPomodor(props.taskKey));
        dispatch(timerActions.setTimer(time));
        if(props.propskipTimer === "Pomodoro"){
            //dispatch(addTaskActions.setPonodoroClickTask());
            dispatch(timerActions.selectPomodoroMode());
            dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
        };
        if(props.propskipTimer === "Breake"){
            //dispatch(addTaskActions.setBreakeClickTask());
            dispatch(timerActions.selectBreackMode());
            dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
        }
        
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