import { configureStore } from "@reduxjs/toolkit";
import timerReducer from './timerReducer';
import addTaskReducer from "./addTaskReducer";
import HeaderReducer from "./HeaderReducer";


const store = configureStore({
    
    reducer:{timer: timerReducer.reducer, addTask: addTaskReducer.reducer, header: HeaderReducer.reducer}
})

export default store;