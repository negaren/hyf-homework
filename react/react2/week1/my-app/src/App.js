import React from "react";
import "./App.css";
import  SearchBoxFunction  from "./SearchBoxFunction";
import HyfRepoFunction from "./HyfRepoFunction";

function App() {
  return (
    <div className="App">
      <h1>Github user search</h1>
      <br />
      <div>
        <SearchBoxFunction/>
      </div>
      <div>
        <HyfRepoFunction/>
      </div>
    </div>
  );
}

export default App;
