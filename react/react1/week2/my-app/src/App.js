import './App.css';
import {MainHearder} from './Header'
import {TodoList} from './Todolist'
import React from 'react';


function App() {
  return (
    <div className="App">
      <MainHearder />
      <TodoList />
    </div>
  );
}

export default App;
