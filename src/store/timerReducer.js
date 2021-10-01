import { createSlice } from "@reduxjs/toolkit";


const timerReducer = createSlice({
    name:'timer',
    initialState: {time: 1500, startStopButton: false, startButtonInfo: "Старт", pomodoroBreakState: true, checkStateOfPomodoroSkipStateButton:"none"},
    reducers: {
        
        setStart(state){
            state.startButtonInfo = "Старт";
        },
        setStop(state){
            state.startButtonInfo = "Стоп";
        },
        changeTime(state){
            state.time = state.time - 1;
        },
        toggle(state, action){
           let arrOfTask = action.payload;
           arrOfTask = arrOfTask.filter(item => item.pomodoroCheck === true);

           if(arrOfTask.length === 1){
               state.startStopButton = !state.startStopButton;
           }
        },
        toggleStartButtonfromTask(state, action){
            if(action.payload === true && state.startButtonInfo === "Стоп"){
                state.startStopButton = !state.startStopButton;
            }

        },
        togglestartStopButton(state){
            state.startStopButton = false;
        },
        showButtonInfo(state){
            if(state.startStopButton===true){
                state.startButtonInfo = "Стоп";
            }else{
                state.startButtonInfo = "Старт";
            }

        },
        setTimer(state, action){
            state.time = action.payload;
        },
        selectPomodoroMode(state){
            state.pomodoroBreakState = true;
        },
        selectBreackMode(state){
            state.pomodoroBreakState = false;
        },
        checkStateOfPomodoroSkipState(state, action){
            state.checkStateOfPomodoroSkipStateButton = action.payload;
        }

    }
})

export const timerActions =  timerReducer.actions;

export default timerReducer;

