import { createSlice } from "@reduxjs/toolkit";


const HeaderReducer = createSlice({
    name:'header',
    initialState: {openPopUpSettings: false},
    reducers: {
        setOpenPopUpSettings(state){
            state.openPopUpSettings = true;
        },
        setClosePopUpSettings(state){
            state.openPopUpSettings = false;
        },
        

    }
})

export const HeaderActions =  HeaderReducer.actions;

export default HeaderReducer;

