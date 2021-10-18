/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./PopUpHeaderSetting.module.css"
import { HeaderActions } from '../../store/HeaderReducer';
import userEvent from '@testing-library/user-event';
import { timerActions } from "../../store/timerReducer";


import useSound from 'use-sound';
import boopSfx1 from '../Task/sm-music-harp-1.mp3';
import boopSfx2 from '../Task/2.mp3';
import boopSfx3 from '../Task/3.mp3';

export const PopUpHeaderSetting = () => {

    const PomodoroTimer = useSelector((state => state.timer.setTimerOfPomodoro));
    const BreakeTimer = useSelector((state => state.timer.setBreakeTimer));

    const [alarmVars, setAlarmVars] = useState(false);
    const dispatch = useDispatch();
    const openPopUpSettings = useSelector(state => state.header.openPopUpSettings);

    const soundCheck = useSelector((state => state.header.soundCheck));
    const [play1] = useSound(boopSfx1);
    const [play2] = useSound(boopSfx2);
    const [play3] = useSound(boopSfx3);

    const closePopUpHendler = (e) => {

        if (!e.target.closest(`.${styles.popUpContent}`)) {
            dispatch(HeaderActions.setClosePopUpSettings());
        };

    };

    const closePopUpHendlerX = (e) => {
        dispatch(HeaderActions.setClosePopUpSettings());
    };


    const openPopUpAlarmVarsHendler = () => {
        setAlarmVars(!alarmVars);
    };
    const setChangesHendler = () => {

    };
    const setPomodoroTimerHendler = (e) => {
        dispatch(timerActions.setTimerOfPomodoro(e.target.value));
    };
    const setBreakeTimerHendler = (e) => {
        dispatch(timerActions.setBreakeTimer(e.target.value));
    };
    const changeSoundHendler = (e) => {
        // dispatch(timerActions.setBreakeTimer(e.target.value));
        dispatch(HeaderActions.setsoundCheck(e.target.outerText));
        setAlarmVars(!alarmVars);

        if (e.target.outerText == "1") {
            play1();
        } else if (e.target.outerText == "2") {
            play2();
        } else if (e.target.outerText == "3") {
            play3();
        }

    }

    return (
        <div>
            <div className={openPopUpSettings ? styles.popUp : styles.popUpClose} onClick={closePopUpHendler}>
                <div className={styles.popUpContent} >
                    {/* Заголовок */}
                    <div className={styles.popUpContentHeader}>
                        <div className={styles.popUpContentH1} >Настройки</div>
                        <div className={styles.popUpContentExit} onClick={closePopUpHendlerX}>╳</div>
                    </div>
                    {/* Настройка времени */}
                    <div className={styles.popUpContentTimeSetUp}>
                        <div className={styles.popUpContentTimeSetUpHeader} > Время (минуты)</div>
                        <div className={styles.popUpContentTimeSetUpInputs}>
                            <div className={styles.popUpContentTimeSetUpInputOfPomodoro}>
                                <div>Помодоро</div>
                                <input type="text" placeholder="20" value={PomodoroTimer} onChange={setPomodoroTimerHendler} />
                            </div>
                            <div className={styles.popUpContentTimeSetUpInputOfBreake}>
                                <div>Перерыв</div>
                                <input type="text" placeholder="5" value={BreakeTimer} onChange={setBreakeTimerHendler} />
                            </div>
                        </div>
                    </div>
                    {/* Настройка звока */}
                    <div className={styles.popUpContentAlarmSetUp}>
                        <div className={styles.popUpContentAlarmHeader} >Звонок </div>
                        <div className={styles.popUpContentAlarmInputs} onClick={openPopUpAlarmVarsHendler}>
                            ˅

                        </div>

                        <div className={styles.popUpContentAlarmVars} onClick={changeSoundHendler}>
                            {(alarmVars) && (
                                <div>

                                    <div className={styles.popUpContentAlarmVar}>
                                        1
                                    </div>
                                    <div className={styles.popUpContentAlarmVar}>
                                        2
                                    </div>
                                    <div className={styles.popUpContentAlarmVar}>
                                        3
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}