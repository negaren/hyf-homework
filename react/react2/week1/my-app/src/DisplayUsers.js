import React, { useContext } from "react";
import { resultContext } from "./SearchBoxFunction";
import "./DisplayUsers.css";

export const DisplayUsers = () => {
  const { fetchResult, loading, serchInputValue, errorMessage } =
    useContext(resultContext);
    console.log(errorMessage);

    if(errorMessage) {
      return <p>{errorMessage}</p>
    }

    if(fetchResult.length === 0 && serchInputValue) {
      return <p>"User is not found"</p>
    }

    if(fetchResult.length === 0) {
      return <p>"No result"</p>
    }

  return (
    <div>
      {loading}
      {fetchResult.map((item) => {
          return <div key={item.login}>{item.login}</div>;

        })}
    </div>
  );
};

