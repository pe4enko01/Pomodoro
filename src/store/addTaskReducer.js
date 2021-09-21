import { createSlice } from "@reduxjs/toolkit";


const addTaskReducer = createSlice({
    name: 'addTask',
    initialState: { task: "", arrOfTasks: [], incDec: 0 },
    reducers: {
        addTask(state, action) {
            state.task = action.payload;
        },

        addTaskToArr(state, action) {
            const key = Math.random();
            const act = action.payload.inputInfo;
            const countOfPomodoros = action.payload.countOfPomodoros;
            state.arrOfTasks.push({ act, countOfPomodoros, key });

        },

        deleteTask(state, action) {
            state.arrOfTasks = state.arrOfTasks.filter(item => item.key !== action.payload);
        },

        incPomodoro(state, action) {
            state.incDec = state.incDec + 1;
        },

        decPomodoro(state, action) {
            if (state.incDec > 0) {
                state.incDec = state.incDec - 1;
            }
        },
        clearPomodoroCounter(state, action) {
            state.incDec = 0;
        }

    }
})

export const addTaskActions = addTaskReducer.actions;

export default addTaskReducer;

