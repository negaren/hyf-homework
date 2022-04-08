import React, { useContext } from "react";
import { HyfRepoContext } from "./HyfRepoFunction";
import "./HyfRepoDisplay.css";

const HyfRepoDisplay = ({ onChange }) => {
  const { user, fetchedData, error } = useContext(HyfRepoContext);
  console.log(error);

  return (
    <>
      <h1>Users repository</h1>
      <p>
        to take a look to HYF repo you may pase "HackYourFuture-CPH" in the
        search bar
      </p>
      <div>
        <input type={"text"} value={user} onChange={onChange}></input>
      </div>
      <div>
        {fetchedData.length > 0 && fetchedData.length !== undefined && user.length !== 0 ? 
                fetchedData.map((item) => {
                  return (
                    <>
                      <p>
                        <span className="title" key={item.login}>
                          {" "}
                          Repository name:{" "}
                        </span>
                        {item.name} <br />
                        <span className="title">url: </span> {item.html_url}{" "}
                      </p>
                      <img
                        src={`${item.owner.avatar_url}`}
                        alt="user avatar"
                        width="300"
                        height="300"
                      />
                    </> )}
                  ): user.length === 0 ? <p>Empty</p> : <p>{error}</p>
        }
      </div>
    </>
  );
};

export default HyfRepoDisplay;
