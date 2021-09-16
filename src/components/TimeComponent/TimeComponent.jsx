import React, { useEffect, useState } from "react";
import { ShowTime } from "../ShowTimeComponent/ShowTime.component";
import { StartStopButton } from "../StartStopButtonComponent/StartStopButton.component";

import styles from "./Time.module.css";

export const TimeComponent = () => {

    const [timer, setTimeCouner] = useState(1500);
    const [timerOn, setTimeCounerOn] = useState(false);

    // const lol = () => {
    //     setTimeCouner(timer => timer - 1); if(timer === 0) {setTimeCounerOn(false)};console.log(timer);clearTimeout(interval)
    // }

    useEffect(() => {
        let interval = null;

        if (timerOn === true) {

            interval = setTimeout(() => { setTimeCouner(timer => timer - 1); if(timer === 0) {setTimeCounerOn(false)};console.log(timer);clearTimeout(interval)}, 1000);

        } else if (timerOn === false) {
            clearTimeout(interval);
        }

        return () => { clearTimeout(interval) }; //Сброс эффекта
    }, [timer, timerOn]);

    const startTimerHendler = () => {
        setTimeCounerOn(!timerOn);
    };

    return (
        <div className={styles.mainTimeBlock}>
            <ShowTime className={styles.timer} timer={timer} ></ShowTime>
            <StartStopButton className={styles.button} startStopHendlerProps={startTimerHendler}>{timerOn ? 'Стоп' : 'Старт'}</StartStopButton>
        </div>
    )
}