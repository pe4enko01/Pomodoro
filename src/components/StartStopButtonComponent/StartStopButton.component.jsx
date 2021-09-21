import React from "react";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timerReducer";
import { useSelector } from "react-redux";

import styles from './StartStopButton.module.css';

export const StartStopButton = () => {

    const dispatch = useDispatch();
    const startButtonInfo = useSelector(state=> state.timer.startButtonInfo);

    const startStopHendlerProps = () => {
        dispatch(timerActions.toggle());
        dispatch(timerActions.showButtonInfo());
    }

    return (
        <button className={styles.button} onClick={startStopHendlerProps}>{startButtonInfo}</button>
    )
}