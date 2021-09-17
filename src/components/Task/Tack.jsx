import React from 'react';
import styles from './Task.module.css'

export const Task = () => {



    return(
        <div className={styles.taskContainer}>
            <div className={styles.taskText}>
                {"Что-то"}
            </div>
        </div>
    )
}