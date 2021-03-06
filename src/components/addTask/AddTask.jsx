import React from 'react';
import { IncDecPomodor } from '../IncDecPomodor/IncDecPomodor';
import { Task } from '../Task/Tack';
import styles from './AddTask.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';
import { useEffect } from 'react';
import { useState } from 'react';
import { timerActions } from "../../store/timerReducer";
import { HeaderActions } from '../../store/HeaderReducer';


export const AddTask = () => {

    const [toggleTask, usetoggleTask] = useState(true);
    const dispatch = useDispatch();
    const inputInfo = useSelector(state => state.addTask.task);
    const taskArr = useSelector(state => state.addTask.arrOfTasks);
    const countOfPomodoros = useSelector(state => state.addTask.incDec);
    const PomodoroTimer = useSelector((state => state.timer.setTimerOfPomodoro)) * 60;
    const [recomend, recomendChange] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("pomodoroTime")) {
            let lol = localStorage.getItem("pomodoroTime");
            //dispatch(timerActions.setTimerOfPomodoro(lol/60));
            dispatch(addTaskActions.setTimerOfPomodoro(lol));
        };
        if (localStorage.getItem("infinitMod")) {
            dispatch(HeaderActions.setInfinitMod());
        };

    })
    const addTaskHendler = (e) => {
        dispatch(addTaskActions.addTask(e.target.value));
    };

    const pushTaskButtonHendler = () => {
        if (inputInfo === "") {
            recomendChange(true);
            return
        };
        recomendChange(false);
        dispatch(addTaskActions.addTaskToArr({ inputInfo: inputInfo, countOfPomodoros: countOfPomodoros, pomodoroCheck: false }));
        dispatch(addTaskActions.addTask(""));
        dispatch(addTaskActions.clearPomodoroCounter());

        const newTaskArr = taskArr.filter(item => item.pomodoroCheck === true);
        if (newTaskArr.length === 1) {
            if (newTaskArr[0].taskState === "Pomodoro") {
                dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
            } else if (newTaskArr[0].taskState === "Breake") {
                dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
            }
        }
    };

    const deleteAllTaskHendler = () => {
        dispatch(addTaskActions.deleteAllTasks());
        dispatch(timerActions.selectPomodoroMode());

        if (localStorage.getItem("pomodoroTime")) {

            dispatch(timerActions.setTimer(localStorage.getItem("pomodoroTime")))
        } else {

            dispatch(timerActions.setTimer(PomodoroTimer));
        }
        localStorage.setItem('selectMode', "pomodoro");
        localStorage.setItem("arr", '');
    };
    const infinitMode = useSelector((state => state.header.infinitMod));

    return (
        <div className={infinitMode ? styles.taskContainerNone : styles.taskContainer}>

            {!toggleTask && (
                <div onClick={() => (usetoggleTask(!toggleTask))} className={styles.closeaTask}>
                    ???????????????? ???????????? {toggleTask}
                </div>
            )}

            {toggleTask && (

                <div className={styles.addTask}>
                    <div className={styles.taskInputContainer}>

                        <input placeholder="?????????????? ????????????" className={styles.inputTask} value={inputInfo} onChange={addTaskHendler} />

                        <IncDecPomodor />
                    </div>

                    <div className={styles.addTaskFotter}>
                        {recomend && (<div className={styles.recomend}>?????????????? ????????????</div>)}
                        <button className={styles.inputButton} onClick={pushTaskButtonHendler}>??????????????????</button>
                        {/* <button className={styles.cancelTaskButton} onClick={() => (usetoggleTask(!toggleTask))}>????????????</button> */}
                        <button className={styles.cancelTaskButton} onClick={() => (deleteAllTaskHendler())} >?????????????? ??????</button>
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
                        propTaskiIsDone={item.taskIsDone}
                        propskipTimer={item.taskState}

                    />
                ))}
            </div>

        </div>
    )
}