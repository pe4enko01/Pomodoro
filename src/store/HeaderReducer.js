import { createSlice } from "@reduxjs/toolkit";


const HeaderReducer = createSlice({
    name:'header',
    initialState: {openPopUpSettings: false, openAuth: false, soundCheck:"1"},
    reducers: {
        setOpenPopUpSettings(state){
            state.openPopUpSettings = true;
        },
        setClosePopUpSettings(state){
            state.openPopUpSettings = false;
        },
        setOpenAuth(state){
            state.openAuth = true;
        },
        setCloseAuth(state){
            state.openAuth = false;
        },
        setsoundCheck(state, action){
            state.soundCheck = action.payload;
        },

    }
})

export const HeaderActions =  HeaderReducer.actions;

export default HeaderReducer;

