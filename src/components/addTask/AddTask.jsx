import React from 'react';
import { IncDecPomodor } from '../IncDecPomodor/IncDecPomodor';
import { Task } from '../Task/Tack';
import styles from './AddTask.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { useEffect } from 'react';
import { useState } from 'react';
import { timerActions } from "../../store/timerReducer";


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
        if(inputInfo === "" || countOfPomodoros === 0 ){

            return
        };
        dispatch(addTaskActions.addTaskToArr({ inputInfo: inputInfo, countOfPomodoros: countOfPomodoros }));
        dispatch(addTaskActions.addTask(""));
        dispatch(addTaskActions.clearPomodoroCounter());
    }

    return (
        <div className={styles.taskContainer}>

            {toggleTask && (
                <div onClick={() => (usetoggleTask(!toggleTask))} className={styles.closeaTask}>
                    Добавить задачу {toggleTask}
                </div>
            )}

            {!toggleTask && (
                
                <div className={styles.addTask}>
                    <div className={styles.taskInputContainer}>

                        <input placeholder="Введите задачу" className={styles.inputTask} value={inputInfo} onChange={addTaskHendler} />

                        <IncDecPomodor />
                    </div>

                    <div className={styles.addTaskFotter}>
                        <button className={styles.inputButton} onClick={pushTaskButtonHendler}>Сохранить</button>
                        <button className={styles.cancelTaskButton} onClick={() => (usetoggleTask(!toggleTask))}>Отмена</button>
                    </div>
                </div>
            )}


            <div>
                {taskArr.map((item) => (
                    <Task buttonStartTimer={item.buttonStartTimer} checPomodoroProp = {item.pomodoroCheck} key={item.key} taskKey={item.key} items={item.act} countOfPomodoros={item.countOfPomodoros} pomororoTimeProps={item.pomodoroTime}/>
                ))}
            </div>

        </div>
    )
}