import React, { useEffect, useState } from "react";
import { ShowTime } from "../ShowTimeComponent/ShowTime.component";
import { StartStopButton } from "../StartStopButtonComponent/StartStopButton.component";

import styles from "./Time.module.css";

export const TimeComponent = () => {

    const [timer, setTimeCouner] = useState(1500);
    const [timerOn, setTimeCounerOn] = useState(false);


    useEffect(() => {
        let interval = null;

        if (timerOn === true) {

            interval = setTimeout(() => {
                if (timer > 0) { setTimeCouner(timer => timer - 1) };
                if (timer === 0) { setTimeCounerOn(false) };
                clearTimeout(interval)
            }, 1);

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