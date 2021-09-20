import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';

import { TimerComponent } from './components/TimeComponent/TimeComponent';
import { Task } from './components/Task/Tack';
import {AddTask} from './components/addTask/AddTask'

function App() {

  //const changeTimer = useSelector(state => state.timer.startStopButton);
  return (
    <div className="App">
      <TimerComponent />
      <AddTask/>
    </div>
  );
}

export default App;
