import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskActions } from '../../store/addTaskReducer';

export const IncDecPomodor = () => {

    const dispach = useDispatch();
    const incDec = useSelector(state => state.addTask.incDec);

    const incrementPomodorHendler = () => {
        dispach(addTaskActions.incPomodoro())
    };

    const decrementPomodorHendler = () => {
        dispach(addTaskActions.decPomodoro())
    };

    return (     
        <div>
            <div>{incDec}</div>
           <button onClick={incrementPomodorHendler}>Бол</button>
           <button onClick={decrementPomodorHendler}>Мен</button>
        </div>
    )
}