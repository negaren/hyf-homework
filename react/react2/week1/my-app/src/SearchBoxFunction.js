import React, { useEffect, useState, createContext } from "react";
import { SearchBox } from "./SearchBox";
import { DisplayUsers } from "./DisplayUsers";

export const resultContext = createContext();

const SearchBoxFunction = () => {
  const [serchInputValue, setSerchInputValue] = useState("");
  const [fetchResult, setFetchResult] = useState([]);
  const [loading, setLoading] = useState("");
  const [errorMessage, setError] = useState("");

  const getData = async () => {
    if (serchInputValue === "") {
      setFetchResult([]);
      setLoading("");
      return;
    }

    setLoading("loading...");

     await fetch(`https://api.github.com/search/users?q=${serchInputValue}`)
      .then((response) => {
        if (!response.ok ) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setFetchResult(data.items);
        }
      })
      .catch((error) => {
         setFetchResult([]);
         setError(error.Error || error.message)
      })
      .finally(() => setLoading(""));
  };

  
  useEffect(() => {
    getData();
  }, [serchInputValue]);

  // const FetchUrl = async () => {
  //   // setLoading("loading...");
  //   return fetch(
  //     `https://api.github.com/search/users?q=${serchInputValue}`
  //   ).then((response) => {
  //     if (!response.ok) {
  //       throw Error("Could not fetch the data");
  //     }
  //     return response.json();
  //   });
  // };

  // const getData = async () => {
  //   await FetchUrl()
  //     .then((data) => setFetchResult(data))
  //     .catch((error) => setError(error.message));
  //     setLoading('')
  // };

  // useEffect(() => {
  //   getData();
  // }, [serchInputValue]);

  function onChangeSearchInput(e) {
    setSerchInputValue(e.target.value);
    setLoading("loading...");
  }

  return (
    <>
      <resultContext.Provider
        value={{ fetchResult, loading, serchInputValue, errorMessage }}
      >
        <SearchBox
          onChange={onChangeSearchInput}
          value={serchInputValue}
        ></SearchBox>
        <DisplayUsers />
      </resultContext.Provider>
    </>
  );
};

export default SearchBoxFunction;
