/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./Auth.module.css";
import { HeaderActions } from '../../store/HeaderReducer';
import userEvent from '@testing-library/user-event';
import { timerActions } from "../../store/timerReducer";
import { AuthActions } from '../../store/AuthReducer';



export const Auth = () => {
    // Хуки Ref для емейла и пароля формы
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    // isLogin - зарегистрирован или нет
    const [isLogin, setIsLogin] = useState(false);
    // isLoading - завершена ли загрузка или нет
    const [isLoading, setIsLoading] = useState(false);
    // Вызов диспатча
    const dispatch = useDispatch();
    // Вызов стейта из ред-ра
    const openAuth = useSelector(state => state.header.openAuth);
    // Hendler закрытия попапа при нажатии вне попапа
    const closePopUpHendler = (e) => {
        if (!e.target.closest(`.${styles.popUpContent}`)) {
            dispatch(HeaderActions.setCloseAuth());
        };
    };
    // Hendler закрытия попапа при нажатии X
    const closePopUpHendlerX = (e) => {
        dispatch(HeaderActions.setCloseAuth());
    };
    // Hendler смены isLogin
    const ChangeIsLoginHendler = (e) => {
        console.log(isLogin);
        setIsLogin(!isLogin);
    };
    //const idToken = useSelector(state => state.auth.idToken);



    const idTokenToLocal = (idToken, time) => {
        localStorage.setItem('idToken', idToken);
        const timeSignIn = new Date().getTime();
        const timeSignOut = new Date().getTime() + (24 * 3600 * 1000 * time);

        localStorage.setItem('timeSignIn', timeSignOut);
        localStorage.setItem('timeSignOut', timeSignOut);
    };


    dispatch(AuthActions.setTokenId(localStorage.getItem("idToken")));


    const [totalTime, settotalTime] = useState(1);
    useEffect(() => {
        const timeSignIn = new Date().getTime();
        const timeSignOut = localStorage.getItem('timeSignOut');
        if(timeSignOut){
            const timer = setTimeout(() => {
                settotalTime((+timeSignOut) - (+timeSignIn));
                if (totalTime < 0) {
                    dispatch(AuthActions.setTokenId("none"));
                    localStorage.clear();
                    console.log("totalTime");
                    clearTimeout(timer);
                }
                clearTimeout(timer);
            }, 1000);
        }
        
    }, [totalTime]);

    //Отправка формы
    const submitFormHendler = (e) => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        let url;
        if (isLogin) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZ9v_-DcfftyzTjjjvIc3yWIYiw3vaSt8";
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZ9v_-DcfftyzTjjjvIc3yWIYiw3vaSt8';
        };
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true

                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMessage = "Регистрация провалена";
                        // if (data && data.error && data.error.message) {
                        //     errorMessage = data.error.message;
                        // };
                        throw new Error(errorMessage);
                    })
                }
            })
            .then(data => {
                dispatch(AuthActions.setTokenId(data.idToken));
                idTokenToLocal(data.idToken, 30);
            })
            .then(() =>{
                settotalTime(2);
            })
            .catch(err => {
                alert(err.message);
            });


    }

    return (
        <>
            <div className={openAuth ? styles.popUp : styles.popUpClose} onClick={closePopUpHendler}>
                <div className={styles.popUpContent} >
                    {/* Заголовок */}
                    <div className={styles.popUpContentHeader}>
                        {!isLogin && <div className={styles.popUpContentH1} >Регистрация</div>}
                        {isLogin && <div className={styles.popUpContentH1} >Войти</div>}
                        <div className={styles.popUpContentExit} onClick={closePopUpHendlerX}>╳</div>
                    </div>

                    <form className={styles.authFormContainer} onSubmit={submitFormHendler}>
                        <input  className={styles.authFormEmail} type="email" placeholder="Введите логин" ref={emailInputRef} />

                        <input  className={styles.authFormPassword} type="password" placeholder="Введите пароль" ref={passwordInputRef} />

                        {!isLoading && <button className={styles.authSubmitButton} type="submit">
                        {!isLogin && <div>Регистрация</div>}
                        {isLogin && <div>Вход</div>}
                            </button>}
                        {isLoading && <p>Отправление запроса</p>}
                    </form>

                    {isLogin && <div className={styles.authFotter} onClick={ChangeIsLoginHendler}>Зарегистрироваться, если нет аккаунта</div>}

                    {!isLogin && <div className={styles.authFotter}  onClick={ChangeIsLoginHendler}>Войти, если есть аккаунт</div>}


                </div>

            </div>
        </>
    )
}