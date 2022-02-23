const fetch = require("node-fetch");
const Trello = require("node-trello");
const base64 = require("base-64");
var btoa = require("btoa");

const trello = new Trello(process.env.TRELLO_USER, process.env.TRELLO_PASS);

// Gets the students github usernames from trello
// This function is a bit rough
function getClasses() {
  return new Promise((resolve, reject) => {
    trello.get("/1/boards/qbNoamhb/lists", async function (err, lists) {
      if (err) reject(err);

      const classLists = lists.filter((list) =>
        list.name.toLowerCase().includes("class")
      );
      const classListsPromises = classLists.map((list) => {
        // yes regex i know
        const classNumber = list.name
          .toLowerCase()
          .split("class")[1]
          .split(" ")[0];

        return new Promise((resolve, reject) => {
          trello.get(`/1/lists/${list.id}/cards`, function (err, cards) {
            if (err) reject(err);

            resolve({ cards, classNumber });
          });
        });
      });

      const classListsWithStudents = await Promise.all(classListsPromises);

      let classesWithStudentsGithubNames = classListsWithStudents.map(
        (individualClass) => {
          const objectToReturn = {};
          objectToReturn[
            parseInt(individualClass.classNumber)
          ] = individualClass.cards
            .map((card) => {
              const description = card.desc.toLowerCase();

              const lines = description.split("\n");
              const githubLine = lines.find((line) => line.includes("github"));
              if (!githubLine) return "no Github username";
              const githubLineStripped = githubLine.replace(" ", "");

              return githubLineStripped.split("github:")[1];
            })
            .filter((card) => Boolean(card));

          return objectToReturn;
        }
      );

      classesWithStudentsGithubNames = classesWithStudentsGithubNames.filter(
        (individualClass) => {
          return individualClass[Object.keys(individualClass)[0]].length > 2;
        }
      );

      // Changing the format from array of objects to only object with class number as keys
      const classesWithStudentsGithubNamesObject = {};
      classesWithStudentsGithubNames.forEach((individualClass) => {
        const classNumber = Object.keys(individualClass)[0];
        if (process.env.DEV_MODE === "development") {
          classesWithStudentsGithubNamesObject[classNumber] = [
            individualClass[classNumber][0],
          ];
        } else {
          classesWithStudentsGithubNamesObject[classNumber] =
            individualClass[classNumber];
        }
      });

      resolve(classesWithStudentsGithubNamesObject);
    });
  });
}

let getHomeworkFolders = () => [
  // "html-css/week1",
  // "html-css/week2",
  // "html-css/week3",
  "git/week1",
  "javascript/javascript1/week1",
  "javascript/javascript1/week2",
  "javascript/javascript1/week3",
  "javascript/javascript1/week4",
  "javascript/javascript2/week1",
  "javascript/javascript2/week2",
  "javascript/javascript2/week3",
  "javascript/javascript3/week1",
  "javascript/javascript3/week2",
  "javascript/javascript3/week3",
  "databases/week1",
  "databases/week2",
  "databases/week3",
  "nodejs/week1",
  "nodejs/week2",
  "nodejs/week3",
  "react/week1",
  "react/week2",
  "react/week3",
  "react/week4",
  "react/week5",
  "git/week2",
];

// Using basic auth to get data from github api
// find the client id and secret here: https://github.com/organizations/HackYourFuture-CPH/settings/applications/926410
// I think you maybe need to make a new secret to see it
const getJsonFromUrl = async (url) => {
  const auth = `${process.env.GITHUB_API_CLIENT_ID}:${process.env.GITHUB_API_SECRET}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(auth),
    },
  });
  return response.json();
};

const getFilesAcceptedAsFulfilledHomework = () => 1;

const arrayIntersect = (array1, array2) =>
  array1.filter(function (n) {
    return array2.indexOf(n) !== -1;
  });

const setTimeoutPromise = (secondsToWait) =>
  new Promise((resolve) => setTimeout(resolve, secondsToWait));

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

module.exports = {
  getClasses,
  getHomeworkFolders,
  getJsonFromUrl,
  getFilesAcceptedAsFulfilledHomework,
  arrayIntersect,
  setTimeoutPromise,
  randomIntFromInterval,
};
