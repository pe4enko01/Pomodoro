import React from 'react';
import { IncDecPomodor } from '../IncDecPomodor/IncDecPomodor';
import { Task } from '../Task/Tack';
import styles from './AddTask.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { useEffect } from 'react';
import { useState } from 'react';


export const AddTask = () => {

    const [toggleTask, usetoggleTask] = useState(true);

    const dispatch = useDispatch();
    const inputInfo = useSelector(state => state.addTask.task);
    const taskArr = useSelector(state => state.addTask.arrOfTasks);
    const countOfPomodoros = useSelector(state => state.addTask.incDec);

    const addTaskHendler = (e) => {
        dispatch(addTaskActions.addTask(e.target.value));
    }

    const pushTaskButtonHendler = () => {
        dispatch(addTaskActions.addTaskToArr({inputInfo : inputInfo, countOfPomodoros:countOfPomodoros}));
        dispatch(addTaskActions.addTask(""));
        dispatch(addTaskActions.clearPomodoroCounter());
    }

    return (
        <div className={styles.taskContainer}>
            {/* {
                toggleTask && (
                    <div onClick={() => (usetoggleTask(!toggleTask))} className={styles.closeaTask}>
                        Добавить задачу {toggleTask}
                    </div>
                )
            }
            {
                !toggleTask && ( */}
            <div onClick={() => (usetoggleTask(!toggleTask))} className={styles.addTask}>
                <input placeholder="Введите задачу" className={styles.inputTask} value={inputInfo} onChange={addTaskHendler} />

                <IncDecPomodor />
                <button className={styles.inputButton} onClick={pushTaskButtonHendler}>Сохранить</button>
            </div>
            {/* )
            } */}
            <div>
                {taskArr.map((item, i) => (
                    <Task key={item.key} taskKey={item.key} item={item.act} countOfPomodoros={item.countOfPomodoros}/>
                ))}
            </div>

        </div>
    )
}