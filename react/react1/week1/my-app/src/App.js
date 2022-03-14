import logo from './logo.svg';
import './App.css';
import {MainHearder} from './Header.js';
import {TasksList} from './Tasks.js';

function App() {
  return (
    <><div>
      <MainHearder />
    </div><div>
        <TasksList />
      </div></>
  );
}

export default App;
