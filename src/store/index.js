import { configureStore } from "@reduxjs/toolkit";
import timerReducer from './timerReducer';
import addTaskReducer from "./addTaskReducer";
import HeaderReducer from "./HeaderReducer";
import AuthReducer from "./AuthReducer";


const store = configureStore({
    
    reducer:{timer: timerReducer.reducer, 
        addTask: addTaskReducer.reducer, 
        header: HeaderReducer.reducer, 
        auth:AuthReducer.reducer}
})

export default store;