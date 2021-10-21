import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {HeaderActions} from '../../store/HeaderReducer';
import { AuthActions } from '../../store/AuthReducer';

import { timerActions } from '../../store/timerReducer';
import { addTaskActions } from '../../store/addTaskReducer';

import styles from "./Header.module.css"

export const Header = () =>{
    const dispatch = useDispatch();

    const openAuth = useSelector(state => state.header.openPopUpSettings);
    const idToken = useSelector(state => state.auth.tokenId);
    const openPopUpHendler = () => {
        dispatch(HeaderActions.setOpenPopUpSettings());
    }

    const openAuthHendler = () => {
        dispatch(HeaderActions.setOpenAuth());
    }

    const signOutHendler = () => {
       localStorage.clear();
       dispatch(AuthActions.setTokenId('none'));
       console.log(idToken);
    };
    useEffect(()=>{
        if(localStorage.getItem("pomodoroTime")){
            let lol = localStorage.getItem("pomodoroTime");
            dispatch(timerActions.setTimerOfPomodoro(lol/60));
            //dispatch(addTaskActions.setTimerOfPomodoro(lol));
        }
    })
    useEffect(()=>{
        if(localStorage.getItem("BreakeTime")){
            let lol = localStorage.getItem("BreakeTime");
            dispatch(timerActions.setBreakeTimer(lol/60));
            //dispatch(addTaskActions.setTimerOfPomodoro(lol));
        }
    })
    useEffect(()=>{
        if(localStorage.getItem('selectMode')){
            if(localStorage.getItem('selectMode') === "breake"){
                dispatch(timerActions.checkStateOfPomodoroSkipState("none2"));
                dispatch(timerActions.selectBreackMode());
            }else if(localStorage.getItem('selectMode') === "pomodoro"){
                dispatch(timerActions.checkStateOfPomodoroSkipState("none"));
                dispatch(timerActions.selectPomodoroMode());
            }
        }
    });

    return(
        <header className={styles.headerMainContainer}>
            <div className={styles.headerLogo}>
                Помодоро
            </div>
            <div className={styles.headerButtonsContainer}>
                <button className={styles.headerButtonSettings} onClick={openPopUpHendler}>Настройки</button>
                {(idToken === "none") && <button className={styles.headerButtonLogin} onClick={openAuthHendler} >Войти</button>}
                {(idToken !== "none")  && <button className={styles.headerButtonLogin} onClick={signOutHendler} >Выйти</button>}
            </div>
        </header>
    )
}