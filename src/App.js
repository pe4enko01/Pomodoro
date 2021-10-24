import styles from './App.module.css';
import { useSelector } from 'react-redux';

import { TimerComponent } from './components/TimeComponent/TimeComponent';
import {AddTask} from './components/addTask/AddTask';
import { Header } from './components/Header/Header';
import {PopUpHeaderSetting} from './components/PopUpHeaderSetting/PopUpHeaderSetting';
import { Auth } from './components/Auth/Auth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const pomodoroMode = useSelector(state => state.timer.pomodoroBreakState);
  const infinitMode = useSelector((state => state.header.infinitMod));

  return (
    <div className={pomodoroMode ? styles.App : styles.AppBreake}>
      <Header></Header>
      <PopUpHeaderSetting></PopUpHeaderSetting>
      <Auth></Auth>
      <TimerComponent />
      <AddTask/>

    </div>
  );
}

export default App;
