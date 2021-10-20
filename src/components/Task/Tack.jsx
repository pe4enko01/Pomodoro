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

    const arr = useSelector(state => state.addTask.arrOfTasks);

    const st = useSelector(state => state.addTask.pomodoroTime)

    const PomodoroTimer = useSelector((state => state.timer.setTimerOfPomodoro)) * 60;
    const BreakeTimerSelector = useSelector((state => state.timer.setBreakeOfPomodoro)) * 60;
    const soundCheck = useSelector((state => state.header.soundCheck));

    const dispatch = useDispatch();
    let pomodoroTime;
    
    const [time, setComponentTimer] = useState(props.pomororoTimeProps);
    //const [time, setComponentTimer] = useState(props.pomororoTimeProps);
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

    // const lol = localStorage.getItem('arr');
    // dispatch(addTaskActions.addLocalStorageToArr(lol));
    //setComponentTimer(props.pomororoTimeProps)

    // useEffect(()=>{
    //     dispatch(addTaskActions.setPomodoroTime({ key: props.taskKey, time: PomodoroTimer }));

    // },[]);

    //dispatch(addTaskActions.setTimerOfPomodoro(PomodoroTimer));
    useEffect(() => {
        let interval = null;


        if (changeTimer === true) {
            interval = setTimeout(() => {


                if (time > 0) {
                    setComponentTimer(time => time - 1);

                    dispatch(addTaskActions.setPomodoroTime({ key: props.taskKey, time: time }));
                    dispatch(timerActions.setTimer(time));
                    console.log(PomodoroTimer);
                    if (skipTimer == "Breake" && stateOfPomodoroSkipStateButton == "none") {
                        console.log(st);
                        //dispatch(addTaskActions.setPomodoroTime({ key: props.taskKey, time: BreakeTimerSelector }));
                        dispatch(timerActions.selectBreackMode());
                        dispatch(timerActions.setTimer(BreakeTimerSelector));
                        setComponentTimer(BreakeTimerSelector);
                        dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
                        dispatch(timerActions.setStart());
                        dispatch(addTaskActions.buttonStartTimerToFalse());
                        dispatch(timerActions.togglestartStopButton());
                        dispatch(timerActions.changeHelperFalse());


                    } else if (skipTimer == "Pomodoro" && stateOfPomodoroSkipStateButton == "none2") {
                        //dispatch(addTaskActions.setPomodoroTime({ key: props.taskKey, time: st }));
                        console.log(st);
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

                    if (soundCheck == "1") {
                        
                        play1();
                    } else if (soundCheck == "2") {
                        play2();
                    } else if (soundCheck == "3") {
                        play3();
                    }
                    
                    dispatch(addTaskActions.setPomodoroTime({ key: props.taskKey, time: BreakeTimerSelector }));

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

                    if (soundCheck == "1") {

                        play1();
                    } else if (soundCheck == "2") {
                        play2();
                        console.log("fdsf");
                    } else if (soundCheck == "3") {
                        play3();
                    }
                    dispatch(addTaskActions.setPomodoroTime({ key: props.taskKey, time: PomodoroTimer }));
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
        else if (changeTimer === false && skipTimer == "Pomodoro" && stateOfPomodoroSkipStateButton === "none2" && skipstatic) {
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


    useEffect(() => {
        if (props.checPomodoroProp === true) {
            dispatch(timerActions.setTimer(time));
        }
    }, [])

    //Добавление массива с тасками в localStorage
    useEffect(() => {
        localStorage.setItem("arr", JSON.stringify(arr));
    }, [arr]);

    const deleteTaskHendler = () => {
        dispatch(addTaskActions.deleteTask(props.taskKey));
        dispatch(timerActions.setStart());
        dispatch(timerActions.setTimer(PomodoroTimer));
        dispatch(timerActions.selectPomodoroMode());
        console.log("1");
        
        localStorage.setItem("arr", JSON.stringify(arr));
        let lol = JSON.parse(localStorage.getItem("arr")).length;
        if(lol=== 1){
            localStorage.setItem("arr", "")
            console.log("kdfghsdkggjsdfl");
        }

    };

    const checkPomodoroHendler = () => {

        dispatch(timerActions.toggleStartButtonfromTask(props.checPomodoroProp));
        dispatch(timerActions.showButtonInfo());
        dispatch(addTaskActions.checkPomodor(props.taskKey));
        dispatch(timerActions.setTimer(time));
        if (props.propskipTimer === "Pomodoro") {
            //dispatch(addTaskActions.setPonodoroClickTask());
            dispatch(timerActions.selectPomodoroMode());
            dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
        };
        if (props.propskipTimer === "Breake") {
            //dispatch(addTaskActions.setBreakeClickTask());
            dispatch(timerActions.selectBreackMode());
            dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
        }
        localStorage.setItem("arr", JSON.stringify(arr));

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