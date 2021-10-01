import styles from './App.module.css';
import { useSelector } from 'react-redux';

import { TimerComponent } from './components/TimeComponent/TimeComponent';
import {AddTask} from './components/addTask/AddTask'

function App() {
  const pomodoroMode = useSelector(state => state.timer.pomodoroBreakState);

  return (
    <div className={pomodoroMode ? styles.App : styles.AppBreake}>
      <TimerComponent />
      <AddTask/>
    </div>
  );
}

export default App;
