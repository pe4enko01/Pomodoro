import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {HeaderActions} from '../../store/HeaderReducer';

import styles from "./Header.module.css"

export const Header = () =>{
    const dispatch = useDispatch();

    const openPopUpSettings = useSelector(state => state.header.openPopUpSettings);
    const openPopUpHendler = () => {
        dispatch(HeaderActions.setOpenPopUpSettings());
    }

    return(
        <header className={styles.headerMainContainer}>
            <div className={styles.headerLogo}>
                Помодоро
            </div>
            <div className={styles.headerButtonsContainer}>
                <button className={styles.headerButtonSettings} onClick={openPopUpHendler}>Настройки</button>
                <button className={styles.headerButtonLogin}>Регистрация</button>
            </div>
        </header>
    )
}