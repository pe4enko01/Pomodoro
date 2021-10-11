/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./PopUpHeaderSetting.module.css"
import { HeaderActions } from '../../store/HeaderReducer';
import userEvent from '@testing-library/user-event';
import { timerActions } from "../../store/timerReducer";

export const PopUpHeaderSetting = () => {

    const PomodoroTimer = useSelector((state => state.timer.setTimerOfPomodoro));
    const BreakeTimer = useSelector((state => state.timer.setBreakeTimer));
    
    const [alarmVars, setAlarmVars] = useState(false);
    const dispatch = useDispatch();
    const openPopUpSettings = useSelector(state => state.header.openPopUpSettings);
    const closePopUpHendler = (e) => {

        if (!e.target.closest(`.${styles.popUpContent}`)) {
            dispatch(HeaderActions.setClosePopUpSettings());
        };

    };

    const openPopUpAlarmVarsHendler = () => {
        setAlarmVars(!alarmVars)
    };
    const setChangesHendler = () => {

    }
    const setPomodoroTimerHendler = (e) => {
        dispatch(timerActions.setTimerOfPomodoro(e.target.value));
    }
    const setBreakeTimerHendler = (e) => {
        dispatch(timerActions.setBreakeTimer(e.target.value));
    }
    
    return (
        <div>
            <div className={openPopUpSettings ? styles.popUp : styles.popUpClose} onClick={closePopUpHendler}>
                <div className={styles.popUpContent} >
                    {/* Заголовок */}
                    <div className={styles.popUpContentHeader}>
                        <div className={styles.popUpContentH1} >Настройки</div>
                        <div className={styles.popUpContentExit}>╳</div>
                    </div>
                    {/* Настройка времени */}
                    <div className={styles.popUpContentTimeSetUp}>
                        <div className={styles.popUpContentTimeSetUpHeader} > Время (минуты)</div>
                        <div className={styles.popUpContentTimeSetUpInputs}>
                            <div className={styles.popUpContentTimeSetUpInputOfPomodoro}>
                                <div>Помодоро</div>
                                <input type="text" placeholder="20" value ={PomodoroTimer} onChange={setPomodoroTimerHendler}  />
                            </div>
                            <div className={styles.popUpContentTimeSetUpInputOfBreake}>
                                <div>Перерыв</div>
                                <input type="text" placeholder="5" value ={BreakeTimer} onChange={setBreakeTimerHendler} />
                            </div>
                        </div>
                    </div>
                    {/* Настройка звока */}
                    <div className={styles.popUpContentAlarmSetUp}>
                        <div className={styles.popUpContentAlarmHeader} >Звонок </div>
                        <div className={styles.popUpContentAlarmInputs} onClick={openPopUpAlarmVarsHendler}>
                            ˅

                        </div>

                        <div className={styles.popUpContentAlarmVars} >
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

                    <div>
                        <button>Применить</button>
                    </div>

                </div>

            </div>
        </div>
    )
}