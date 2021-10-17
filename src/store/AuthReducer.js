import { createSlice } from "@reduxjs/toolkit";


const AuthReducer = createSlice({
    name:'auth',
    initialState: {tokenId:"none",},
    reducers: {
        setTokenId(state, action){
            if(action.payload){
                state.tokenId = action.payload;
            }
        },


    }
})

export const AuthActions =  AuthReducer.actions;

export default AuthReducer;

