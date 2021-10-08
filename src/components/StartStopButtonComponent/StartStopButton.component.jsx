import React from "react";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timerReducer";
import { useSelector } from "react-redux";
import { addTaskActions } from '../../store/addTaskReducer';

import useSound from 'use-sound';
import boopSfx from '../Task/sm-music-harp-1.mp3';


import styles from './StartStopButton.module.css';

export const StartStopButton = () => {

    const dispatch = useDispatch();
    const startButtonInfo = useSelector(state=> state.timer.startButtonInfo);
    const arrOfTasks  = useSelector(state=> state.addTask.arrOfTasks);
    

    const startStopHendlerProps = () => {
        dispatch(timerActions.toggle(arrOfTasks));
        dispatch(timerActions.showButtonInfo());
        dispatch(addTaskActions.buttonStartTimerToggle());   
    }

    return (
        <button className={styles.button} onClick={startStopHendlerProps}>{startButtonInfo}</button>
    )
}