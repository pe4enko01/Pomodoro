import { createSlice } from "@reduxjs/toolkit";

const addTaskReducer = createSlice({
    name: 'addTask',
    initialState: { task: "", arrOfTasks: [], incDec: 1, pomodoroCheck: false, pomodoroTime: 1500, buttonStartTimer: false },
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
            state.arrOfTasks.push({ buttonStartTimer, act, countOfPomodoros, pomodoroCheck, pomodoroTime, key });

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




    }
})

export const addTaskActions = addTaskReducer.actions;

export default addTaskReducer;

