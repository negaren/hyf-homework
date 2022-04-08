import React, { useContext } from "react";
import { resultContext } from "./SearchBoxFunction";
import "./DisplayUsers.css";

export const DisplayUsers = () => {
  const { fetchResult, loading, setLoading, serchInputValue, error } =
    useContext(resultContext);
  const finalResult = fetchResult.items;
  return (
    <div>
      {loading}
      {finalResult !== undefined && finalResult.length !== 0 ? (
        finalResult.map((item) => {
          return <div key={item.login}>{item.login}</div>;
        })
      ) : serchInputValue.length == 0 ? (
        <p>"No result"</p>
      ) : (
        <p>{error}</p>
      )}
      {/* {setLoading("")} */}
    </div>
  );
};
