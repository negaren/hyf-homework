import { useEffect, useState, createContext } from "react";
import HyfRepoDisplay from "./HyfRepoDisplay";

export const HyfRepoContext = createContext();

const HyfRepoFunction = () => {
  const [fetchedData, setFetchedData] = useState({});
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  async function fetchUrl() {
    return fetch(`https://api.github.com/users/${user}/repos`).then(
      (response) => {
        if (!response.ok) {
          throw Error("Could not fetch the url");
        }
        return response.json();
      }
    );
  }

  async function getData() {
    await fetchUrl()
      .then((data) => setFetchedData(data))
      .catch((error) => setError(error.message));
  }
  useEffect(() => {
    getData();
  }, [user]);

  function urlUserHandler(event) {
    setUser(event.target.value);
  }

  return (
    <>
      <HyfRepoContext.Provider value={{ fetchedData, error, user }}>
        <HyfRepoDisplay onChange={urlUserHandler} />
      </HyfRepoContext.Provider>
    </>
  );
};

export default HyfRepoFunction;

//HackYourFuture-CPH
