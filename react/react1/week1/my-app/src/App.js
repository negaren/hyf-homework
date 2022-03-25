import './App.css';
import {MainHearder} from './Header.js';
import {TasksList} from './Tasks.js';

function App() {
  return (
    <>
      <MainHearder />
      <ul>
        <TasksList />
      </ul>
        
      </>
  );
}

export default App;
