import React from 'react';
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

    if(localStorage.getItem("pomodoroTime")){
        let lol = localStorage.getItem("pomodoroTime");
        dispatch(timerActions.setTimerOfPomodoro(lol/60));
        //dispatch(addTaskActions.setTimerOfPomodoro(lol));
    }
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