import React from 'react';
import { Task } from '../Task/Tack';
import styles from './AddTask.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { useEffect } from 'react';

export const AddTask = () => {
    const dispatch = useDispatch();

    const inputInfo = useSelector(state=> state.addTask.task);
    const taskArr = useSelector(state=> state.addTask.arrOfTasks);

    const addTaskHendler = (e) => {
            dispatch(addTaskActions.addTask(e.target.value));
    }

    const pushTaskButtonHendler = () => {
        dispatch(addTaskActions.addTaskToArr(inputInfo));
        dispatch(addTaskActions.addTask(""));
    }

    return(
        <div className={styles.addTask}>
            
            <input value={inputInfo} onChange={addTaskHendler}/>
            <button onClick={pushTaskButtonHendler}>Сохранить</button>
            {taskArr.map((item, i)=>(
                <Task key={item.key} taskKey={item.key} item={item.act}/>
            ))}

        </div>
    )
}