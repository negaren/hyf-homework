import React, { useContext } from "react";
import { resultContext } from "./SearchBoxFunction";
import "./DisplayUsers.css";

export const DisplayUsers = () => {
  const { fetchResult, loading, serchInputValue, errorMessage } =
    useContext(resultContext);
    console.log(errorMessage);
  return (
    <div>
      {loading}
      {fetchResult.length !== 0 ? (
        fetchResult.map((item) => {
          return <div key={item.login}>{item.login}</div>;
        })
      ) : serchInputValue.length == 0 ? (
        <p>"No result"</p>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};


// export const DisplayUsers = () => {
//   const { fetchResult, loading, serchInputValue, error } =
//     useContext(resultContext);
//   const finalResult = fetchResult.items;
//   console.log(fetchResult);
//   return (
//     <div>
//       {loading}
//       {finalResult !== undefined && finalResult.length !== 0 ? (
//         finalResult.map((item) => {
//           return <div key={item.login}>{item.login}</div>;
//         })
//       ) : serchInputValue.length == 0 ? (
//         <p>"No result"</p>
//       ) : (
//         <p>{error}</p>
//       )}
//     </div>
//   );
// };