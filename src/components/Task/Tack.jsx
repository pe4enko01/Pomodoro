import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';

import styles from './Task.module.css'

export const Task = (props) => {
    const dispatch = useDispatch();
    const inputInfo = useSelector(state=> state.addTask.task);
    const taskArr = useSelector(state=> state.addTask.arrOfTasks);


    const deleteTaskHendler = (e) => {
        
        dispatch(addTaskActions.deleteTask(props.taskKey));
        console.log("1");

    };

    return(
        <div className={styles.taskContainer}>
            <div className={styles.taskText}>
                {props.item}
            </div>
            <button  onClick={deleteTaskHendler}>Удалить</button>
        </div>
    )
}