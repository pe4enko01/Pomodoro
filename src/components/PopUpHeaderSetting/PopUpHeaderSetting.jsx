/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./PopUpHeaderSetting.module.css"
import { HeaderActions } from '../../store/HeaderReducer';
import userEvent from '@testing-library/user-event';
import { timerActions } from "../../store/timerReducer";
import { addTaskActions } from '../../store/addTaskReducer';


import useSound from 'use-sound';
import boopSfx1 from '../Task/sm-music-harp-1.mp3';
import boopSfx2 from '../Task/2.mp3';
import boopSfx3 from '../Task/3.mp3';

export const PopUpHeaderSetting = () => {

    const PomodoroTimer = useSelector((state => state.timer.setTimerOfPomodoro));
    const BreakeTimer = useSelector((state => state.timer.setBreakeOfPomodoro));

    const [alarmVars, setAlarmVars] = useState(false);
    const dispatch = useDispatch();
    const openPopUpSettings = useSelector(state => state.header.openPopUpSettings);

    const rer = useSelector(state => state.addTask.pomodoroTime);

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

        localStorage.setItem("pomodoroTime", e.target.value * 60);
        // const pomodoroTime = localStorage.getItem("pomodoroTime");
        //dispatch(addTaskActions.setTimerOfPomodoro(pomodoroTime));     
    };
    const setBreakeTimerHendler = (e) => {
        dispatch(timerActions.setBreakeTimer(e.target.value));

        localStorage.setItem("BreakeTime", e.target.value * 60);
        //const BreakeTime = localStorage.getItem("pomodoroTime");
        //dispatch(addTaskActions.setTimerOfPomodoro(pomodoroTime)); 

    };
    const changeSoundHendler = (e) => {
        // dispatch(timerActions.setBreakeTimer(e.target.value));
        dispatch(HeaderActions.setsoundCheck(e.target.outerText));
        setAlarmVars(!alarmVars);

        if (e.target.outerText === "1") {
            play1();
        } else if (e.target.outerText === "2") {
            play2();
        } else if (e.target.outerText === "3") {
            play3();
        }

    }
    const setInfinitTackModHendler = (e) => {
        let lol = e.target.parentElement.children[1].checked;
        //console.log(e.target.parentElement.children[1]);
        e.target.parentElement.children[1].checked = !lol;


        if (e.target.parentElement.children[1].checked === true) {
            dispatch(HeaderActions.setInfinitMod());
            dispatch(addTaskActions.uncheckPomodor("2"));
            dispatch(addTaskActions.addTaskToArr({ inputInfo: "??????", countOfPomodoros: 10000, pomodoroCheck: true }));
            localStorage.setItem('infinitMod', true);


        } else {
            dispatch(HeaderActions.setNoInfinitMod());
            dispatch(addTaskActions.uncheckPomodor("2"));
            dispatch(addTaskActions.deleteLastElemOfArr());
            localStorage.setItem('infinitMod', "");
        }

    }
    return (
        <div>
            <div className={openPopUpSettings ? styles.popUp : styles.popUpClose} onClick={closePopUpHendler}>
                <div className={styles.popUpContent} >
                    {/* ?????????????????? */}
                    <div className={styles.popUpContentHeader}>
                        <div className={styles.popUpContentH1} >??????????????????</div>
                        <div className={styles.popUpContentExit} onClick={closePopUpHendlerX}>???</div>
                    </div>
                    {/* ?????????????????? ?????????????? */}
                    <div className={styles.popUpContentTimeSetUp}>
                        <div className={styles.popUpContentTimeSetUpHeader} > ?????????? (????????????)</div>
                        <div className={styles.popUpContentTimeSetUpInputs}>
                            <div className={styles.popUpContentTimeSetUpInputOfPomodoro}>
                                <div>????????????????</div>
                                <input type="text" value={PomodoroTimer} onChange={setPomodoroTimerHendler} />
                            </div>
                            <div className={styles.popUpContentTimeSetUpInputOfBreake}>
                                <div>??????????????</div>
                                <input type="text" value={BreakeTimer} onChange={setBreakeTimerHendler} />
                            </div>
                        </div>
                    </div>
                    {/* ?????????????????? ?????????? */}
                    <div className={styles.popUpContentAlarmSetUp}>
                        <div className={styles.popUpContentAlarmHeader} >???????????? </div>
                        <div className={styles.popUpContentAlarmInputs} onClick={openPopUpAlarmVarsHendler}>
                            ??

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

                        {/* <div className={styles.popUpContentInfinitTask}>
                            <button className={styles.popUpContentInfinitTask} onClick={setInfinitTackModHendler}> ???? </button>
                            <button className={styles.popUpContentNoInfinitTask}> ?????? </button>
                        </div> */}


                    </div>
                    <div className={styles.popUpContentChcketBox} >
                        <div className={styles.popUpContentHeader}>?????????????????????? ??????????</div>
                        <input defaultChecked={(localStorage.getItem("infinitMod")) && "checked"}  type="checkbox" className={styles.checkbox}  />
                        <label onClick={setInfinitTackModHendler}></label>
                        {/* checked={(localStorage.getItem("infinitMod")) && "checked"} */}
                    </div>

                </div>

            </div>
        </div>
    )
}