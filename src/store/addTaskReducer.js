import { createSlice } from "@reduxjs/toolkit";


const addTaskReducer = createSlice({
    name: 'addTask',
    initialState: { task: "", arrOfTasks: [] },
    reducers: {
        addTask(state, action) {
            state.task = action.payload;
        },

        addTaskToArr(state, action) {
            let key = Math.random();
            let act = action.payload;
            state.arrOfTasks.push({act, key});

        },

        deleteTask(state, action) {
            state.arrOfTasks = state.arrOfTasks.filter(item => item.key !== action.payload);
        }

    }
})

export const addTaskActions = addTaskReducer.actions;

export default addTaskReducer;

