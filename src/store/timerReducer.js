import { createSlice } from "@reduxjs/toolkit";


const timerReducer = createSlice({
    name:'timer',
    initialState: {time: 1500, startStopButton: false, startButtonInfo: "Старт"},
    reducers: {
        changeTime(state){
            state.time = state.time - 1;
        },
        toggle(state){
            state.startStopButton = !state.startStopButton;
        },
        showButtonInfo(state){
            if(state.startStopButton===true){
                state.startButtonInfo = "Стоп"
            }else{
                state.startButtonInfo = "Старт"
            }

        }
    }
})

export const timerActions =  timerReducer.actions;

export default timerReducer;

