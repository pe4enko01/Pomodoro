import { createSlice } from "@reduxjs/toolkit";

const addTaskReducer = createSlice({
    name: 'addTask',
    initialState: { task: "", arrOfTasks: [], incDec: 1, pomodoroCheck: false, pomodoroTime: 1500, helpvar: 1500 },
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
            state.arrOfTasks.push({ act, countOfPomodoros, pomodoroCheck, pomodoroTime, key });

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
            state.incDec = 1;
        },
        checkPomodor(state, action) {
            state.arrOfTasks = state.arrOfTasks.map(
                item => {
                    if (item.key === action.payload) {
                        item.pomodoroCheck = true;
                        return { ...item }
                    } else {
                        item.pomodoroCheck = false;
                        return { ...item }
                    }
                }
            )
        },
        setTimerOfPomodoro(state, action){
            state.pomodoroTime = action.payload;

            
        },

        returnPomororoTime(state,action){
            state.arrOfTasks.forEach(
                item => {
                    if (item.key === action.payload.taskKey) {
                        state.helpvar = item.pomodoroTime;
                    }
                }
                
            )
            console.log(state.helpvar);
        },
   
        
        setNewTimerPomodoroArr(state,action){
            state.arrOfTasks = state.arrOfTasks.map(
                item => {
                    if (item.key === action.payload.taskKey) {
                        //state.pomodoroTime = action.payload.pomodoroTimeProps;
                        item.pomodoroTime = state.pomodoroTime;
                        item.pomodoroCheck = true;
                        return { ...item }
                    } else {
                        item.pomodoroCheck = false;
                        return { ...item }
                    }
                }
                
            );
            console.log(state.arrOfTasks);
            
        }

        

        
    }
})

export const addTaskActions = addTaskReducer.actions;

export default addTaskReducer;

