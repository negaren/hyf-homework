import React, { useEffect, useState, createContext } from "react";
import { SearchBox } from "./SearchBox";
import { DisplayUsers } from "./DisplayUsers";

export const resultContext = createContext();

const SearchBoxFunction = () => {
  const [serchInputValue, setSerchInputValue] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const FetchUrl = async () => {
    setLoading("loading...");
    return fetch(
      `https://api.github.com/search/users?q=${serchInputValue}`
    ).then((response) => {
      if (!response.ok) {
        throw Error("Could not fetch the data");
      }
      return response.json();
    });
  };

  const getData = async () => {
    await FetchUrl()
      .then((data) => setFetchResult(data))
      .catch((error) => setError(error.message));
  };
  useEffect(() => {
    getData();
  }, [serchInputValue]);

  function onChangeSearchInput(e) {
    setSerchInputValue(e.target.value);
    setLoading("loading...");
  }

  return (
    <>
      <resultContext.Provider
        value={{ fetchResult, loading, setLoading, serchInputValue, error }}
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
