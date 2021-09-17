import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';

import { TimerComponent } from './components/TimeComponent/TimeComponent';
import { Task } from './components/Task/Tack';

function App() {

  //const changeTimer = useSelector(state => state.timer.startStopButton);
  return (
    <div className="App">
      <TimerComponent />
      <Task/>
    </div>
  );
}

export default App;
