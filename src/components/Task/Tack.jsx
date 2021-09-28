import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { timerActions } from "../../store/timerReducer";

import styles from './Task.module.css';

export const Task = (props) => {
    const dispatch = useDispatch();
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

    const startButtonInfo = useSelector(state=> state.timer.startButtonInfo);
    const checkPomodoroHendler = () => {
        dispatch(timerActions.toggleStartButtonfromTask(props.checPomodoroProp));
        dispatch(timerActions.showButtonInfo());
        dispatch(addTaskActions.checkPomodor(props.taskKey));
        dispatch(timerActions.setTimer(time));

    
        
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
            </div>
            <div className={styles.deleteButtonContainer}>
                <button  className={styles.deleteTaskBtton} onClick={deleteTaskHendler}>Удалить</button>
            </div>
        </div>

    )
}