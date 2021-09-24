import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { timerActions } from "../../store/timerReducer";

import styles from './Task.module.css'

export const Task = (props) => {
    const dispatch = useDispatch();
    const inputInfo = useSelector(state => state.addTask.task);
    const taskArr = useSelector(state => state.addTask.arrOfTasks);
    const helpvar = useSelector(state => state.addTask.helpvar);
    const pomodoroTime = useSelector(state => state.addTask.pomodoroTime);
    const [time, lol] = useState(1500);



    const changeTimer = props.buttonStartTimer;


    useEffect(() => {
        let interval = null;
        if (changeTimer === true) {
            interval = setTimeout(() => { if (time > 0) { lol(time => time - 1); dispatch(timerActions.setTimer(time)) }; clearTimeout(interval) }, 100);
        } else if (changeTimer === false) {
            clearTimeout(interval);
        }
        return () => { clearTimeout(interval) }; //Сброс эффекта
    }, [time, changeTimer, dispatch]);



    const deleteTaskHendler = () => {
        dispatch(addTaskActions.deleteTask(props.taskKey));
        dispatch(addTaskActions.checkFirstElement());
    };

    const checkPomodoroHendler = () => {
        dispatch(addTaskActions.checkPomodor(props.taskKey));
        dispatch(timerActions.setTimer(time))
        // dispatch(addTaskActions.returnPomororoTime({taskKey: props.taskKey}));
        // dispatch(addTaskActions.setNewTimerPomodoroArr({taskKey: props.taskKey}));
    };





    return (
        <div>

            <div className={props.checPomodoroProp ? styles.taskContainerCheck : styles.taskContainer} onClick={checkPomodoroHendler}>
                <div className={styles.taskText}>
                    {props.items}
                </div>
                <div className={styles.countOfPomodoros}>
                    0/{props.countOfPomodoros}----
                    {time}
                </div>
                <button className={styles.deleteTaskBtton} onClick={deleteTaskHendler}>Удалить</button>
            </div>
        </div>
    )
}