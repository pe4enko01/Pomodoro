import { createSlice } from "@reduxjs/toolkit";

const addTaskReducer = createSlice({
    name: 'addTask',
    initialState: { task: "", arrOfTasks: [], incDec: 1, pomodoroCheck: false, 
    pomodoroTime: 1500, buttonStartTimer: false, donePomodoros: 0, taskIsDone:false, taskState: "Pomodoro" },

    reducers: {
        addTask(state, action) {
            state.task = action.payload;
        },

        addTaskToArr(state, action) {
            const key = Math.random();
            const act = action.payload.inputInfo;
            const countOfPomodoros = action.payload.countOfPomodoros;
            const pomodoroCheck = false;
            const pomodoroTime = 1500;
            const buttonStartTimer = false;
            const donePomodoros = state.donePomodoros;
            const taskIsDone = state.taskIsDone;
            const taskState = state.taskState;
            state.arrOfTasks.push({ buttonStartTimer, act, countOfPomodoros, pomodoroCheck, pomodoroTime, donePomodoros,taskIsDone, taskState, key });

        },

        deleteTask(state, action) {
            state.arrOfTasks = state.arrOfTasks.filter(item => item.key !== action.payload);
        },

        checkFirstElement(state) {

            // state.arrOfTasks = state.arrOfTasks.map(
            //     (item, i) => {
            //         item.buttonStartTimer = false;
            //         item.pomodoroCheck = false;
            //         return { ...item }
            //     }
            // );
        },
        pomodoroCheckToFalse(state){
            state.arrOfTasks = state.arrOfTasks.map(
                item => {
                    if (item.pomodoroCheck === true) {
                        item.buttonStartTimer = false;
                        return { ...item }
                    } else {
                        return { ...item }
                    }
                }
            )
        },
        incdonePomodoros(state, action) {
            state.donePomodoros = state.donePomodoros + 1;
        },

        donePomodorosAddToArr(state) {
            state.arrOfTasks = state.arrOfTasks.map(
                item => {
                    if (item.pomodoroCheck === true) {
                        item.donePomodoros = item.donePomodoros + 1;
                        return { ...item }
                    } else {
                        return { ...item }
                    }
                }
            )
        },

        incPomodoro(state, action) {
            state.incDec = state.incDec + 1;
        },

        decPomodoro(state, action) {
            if (state.incDec > 0) {
                state.incDec = state.incDec - 1;
            }
        },
        clearPomodoroCounter(state) {
            state.incDec = 1;
        },
        checkPomodor(state, action) {
            state.arrOfTasks = state.arrOfTasks.map(
                item => {
                    if (item.key === action.payload && item.pomodoroCheck === false) {
                        item.pomodoroCheck = true;
                        return { ...item }
                    } else {
                        item.buttonStartTimer = false;

                        item.pomodoroCheck = false;
                        return { ...item }
                    }
                }
            );

        },
        uncheckPomodor(state, action) {
            state.arrOfTasks = state.arrOfTasks.map(
                item => {
                    if (item.key === action.payload && item.pomodoroCheck === false) {
                        return { ...item }
                    } else {
                        item.buttonStartTimer = false;
                        item.pomodoroCheck = false;
                        return { ...item }
                    }
                }
            );

        },
        setTimerOfPomodoro(state, action) {
            state.pomodoroTime = action.payload;


        },

        buttonStartTimerToggle(state) {
            state.arrOfTasks = state.arrOfTasks.map(
                (item, i) => {
                    if (item.pomodoroCheck === true) {
                        item.buttonStartTimer = !item.buttonStartTimer;
                        return { ...item }
                    } else {
                        item.buttonStartTimer = false;
                        return { ...item }
                    }
                }

            );
        },
        buttonStartTimerToFalse(state) {
            state.arrOfTasks = state.arrOfTasks.map(
                (item, i) => {
                    if (item.pomodoroCheck === true) {
                        item.buttonStartTimer = false;
                        return { ...item }
                    } else {
                        item.buttonStartTimer = false;
                        return { ...item }
                    }
                }

            );
        },

        taskIsDone(state){
            state.arrOfTasks = state.arrOfTasks.map(
                (item, i) => {
                    if (item.pomodoroCheck === true) {
                        item.taskIsDone = true;
                        return { ...item }
                    } else {
                        
                        return { ...item }
                    }
                }

            );
        },
        skipTimer(state){
            state.arrOfTasks = state.arrOfTasks.map(
                (item, i) => {
                    if (item.pomodoroCheck === true ) {
                        item.taskState = "Breake";
                        return { ...item }
                    } else {
                        item.taskState = "Pomodoro";
                        return { ...item }
                    }
                }

            );
        },
        setPonodoroOnState(state){
            state.arrOfTasks = state.arrOfTasks.map(
                (item, i) => {
                    if (item.pomodoroCheck === true) {
                        item.taskState = "Pomodoro";
                        return { ...item }
                    } else {
                        item.taskState = "Pomodoro";
                        return { ...item }
                    }
                }

            );
        },





    }
})

export const addTaskActions = addTaskReducer.actions;

export default addTaskReducer;

