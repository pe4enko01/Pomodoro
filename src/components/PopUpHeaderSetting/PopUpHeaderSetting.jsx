/* eslint-disable no-undef */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./PopUpHeaderSetting.module.css"
import {HeaderActions} from '../../store/HeaderReducer';

export const PopUpHeaderSetting = () => {

    const dispatch = useDispatch();
    const openPopUpSettings = useSelector(state => state.header.openPopUpSettings);
    const closePopUpHendler = (e) => {

        if(!e.target.closest(`.${styles.popUpContent}`)){
            dispatch(HeaderActions.setClosePopUpSettings());
        };

    };

    return (
        <div>
            <div className={openPopUpSettings ? styles.popUp : styles.popUpClose} onClick={closePopUpHendler}>
                <div className={styles.popUpContent} >

                </div>

            </div>
        </div>
    )
}