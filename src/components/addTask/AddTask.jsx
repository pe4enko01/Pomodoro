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
    const [recomend, recomendChange] = useState(false);

    if(localStorage.getItem("pomodoroTime")){
        let lol = localStorage.getItem("pomodoroTime");
        //dispatch(timerActions.setTimerOfPomodoro(lol/60));
        dispatch(addTaskActions.setTimerOfPomodoro(lol));
    }
    

    const addTaskHendler = (e) => {
        dispatch(addTaskActions.addTask(e.target.value));
    }

    const pushTaskButtonHendler = () => {
        if (inputInfo === "") {
            recomendChange(true);
            return
        };
        recomendChange(false);
        dispatch(addTaskActions.addTaskToArr({ inputInfo: inputInfo, countOfPomodoros: countOfPomodoros }));
        dispatch(addTaskActions.addTask(""));
        dispatch(addTaskActions.clearPomodoroCounter());

        const newTaskArr = taskArr.filter(item => item.pomodoroCheck === true);
        if(newTaskArr.length === 1){
            if(newTaskArr[0].taskState === "Pomodoro"){
                dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
            }else if(newTaskArr[0].taskState === "Breake"){
                dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
            }
        }
    }

    const deleteAllTaskHendler = () =>{
        dispatch(addTaskActions.deleteAllTasks());
        localStorage.setItem("arr", '');  
        //dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
    }
    return (
        <div className={styles.taskContainer}>

            {!toggleTask && (
                <div onClick={() => (usetoggleTask(!toggleTask))} className={styles.closeaTask}>
                    Добавить задачу {toggleTask}
                </div>
            )}

            {toggleTask && (

                <div className={styles.addTask}>
                    <div className={styles.taskInputContainer}>

                        <input placeholder="Введите задачу" className={styles.inputTask} value={inputInfo} onChange={addTaskHendler} />

                        <IncDecPomodor />
                    </div>

                    <div className={styles.addTaskFotter}>
                        {recomend && (<div className={ styles.recomend}>Введите задачу</div>)}
                        <button className={styles.inputButton} onClick={pushTaskButtonHendler}>Сохранить</button>
                        {/* <button className={styles.cancelTaskButton} onClick={() => (usetoggleTask(!toggleTask))}>Отмена</button> */}
                        <button className={styles.cancelTaskButton} onClick={() => (deleteAllTaskHendler())} >Удалить все</button>
                    </div>
                </div>
            )}


            <div>
                {taskArr.map((item) => (
                    <Task buttonStartTimer={item.buttonStartTimer}
                        checPomodoroProp={item.pomodoroCheck}
                        key={item.key}
                        taskKey={item.key}
                        items={item.act}
                        countOfPomodoros={item.countOfPomodoros}
                        pomororoTimeProps={item.pomodoroTime}
                        propsdonePomodoros={item.donePomodoros}
                        propTaskiIsDone = {item.taskIsDone}
                        propskipTimer = {item.taskState}

                    />
                ))}
            </div>

        </div>
    )
}