import { configureStore } from "@reduxjs/toolkit";
import timerReducer from './timerReducer';
import addTaskReducer from "./addTaskReducer";


const store = configureStore({
    
    reducer:{timer: timerReducer.reducer, addTask: addTaskReducer.reducer}
})

export default store;