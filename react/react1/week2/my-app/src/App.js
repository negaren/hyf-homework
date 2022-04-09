import './App.css';
import {MainHearder} from './Header'
import {TodoList} from './Todolist'
import React from 'react';
import Counter from './Timer';


function App() {
  return (
    <div className="App">
      <MainHearder />
      <Counter/>
      <TodoList />
    </div>
  );
}

export default App;
