/* eslint-disable no-undef */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./PopUpHeaderSetting.module.css"


export const PopUpHeaderSetting = () => {
    const openPopUpSettings = useSelector(state => state.header.openPopUpSettings);


    return (
        <div>
            <div className={openPopUpSettings ? styles.popUp : styles.popUpClose} >
                <div className={styles.popUpContent}>

                </div>

            </div>
        </div>
    )
}