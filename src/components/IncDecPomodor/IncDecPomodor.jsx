import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import styles from "./IncDecPomodor.module.css"

export const IncDecPomodor = () => {

    const dispach = useDispatch();
    const incDec = useSelector(state => state.addTask.incDec);

    const incrementPomodorHendler = () => {
        dispach(addTaskActions.incPomodoro())
    };

    const decrementPomodorHendler = () => {
        dispach(addTaskActions.decPomodoro())
    };

    return (     
        <div className={styles.incdecContainer}>
            <div className={styles.incdecScreen}>{incDec}</div>
           <button className={styles.incdecButton} onClick={incrementPomodorHendler}>˄</button>
           <button className={styles.incdecButton} onClick={decrementPomodorHendler}>˅</button>
        </div>
    )
}