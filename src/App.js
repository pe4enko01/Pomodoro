import styles from './App.module.css';
import { useSelector } from 'react-redux';

import { TimerComponent } from './components/TimeComponent/TimeComponent';
import {AddTask} from './components/addTask/AddTask';
import { Header } from './components/Header/Header';
import {PopUpHeaderSetting} from './components/PopUpHeaderSetting/PopUpHeaderSetting' 

function App() {
  const pomodoroMode = useSelector(state => state.timer.pomodoroBreakState);

  return (
    <div className={pomodoroMode ? styles.App : styles.AppBreake}>
      <Header></Header>
      <PopUpHeaderSetting></PopUpHeaderSetting>
      <TimerComponent />
      <AddTask/>
    </div>
  );
}

export default App;
