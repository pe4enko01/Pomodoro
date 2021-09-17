import { configureStore } from "@reduxjs/toolkit";
import timerReducer from './timerReducer';


const store = configureStore({
    reducer:{timer: timerReducer.reducer}
})

export default store;