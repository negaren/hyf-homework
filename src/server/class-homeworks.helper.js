const fetch = require("node-fetch");
const NodeCache = require("node-cache");

const utils = require("./utils");
const pullRequestController = require("./pull-request/pull-request.controller");
const CACHE_TIMEOUT_MINUTES = 15;
const studentHomeworkCache = new NodeCache({
  stdTTL: CACHE_TIMEOUT_MINUTES * 60,
});

// Gets the peer review groups
const getClassPeerReviewGroups = async (classNumber) =>
  utils.getJsonFromUrl(
    `https://hyf-peer-review.herokuapp.com/api/class-groups/${classNumber}`
  );

// This function gets the homeworks for each homework week. Fx node/week1
// It finds the relevant PR using the branch name!
async function getStudentHomework(
  username,
  studentsInClass,
  classPeerReviewGroups,
  classNumber
) {
  const cachedHomeworks = studentHomeworkCache.get(username);
  if (cachedHomeworks) {
    return cachedHomeworks;
  }

  const homeworkFoldersMapped = await Promise.all(
    // ["javascript/javascript2/week3"].map(async (homeworkFolder) => {
    utils.getHomeworkFolders().map(async (homeworkFolder) => {
      try {
        const pr = await pullRequestController.getPrDetails(
          username,
          homeworkFolder,
          studentsInClass,
          classPeerReviewGroups,
          classNumber
        );

        // console.log("get pr details", pr)

        return {
          filesLink: `https://github.com/${username}/hyf-homework/tree/master/${homeworkFolder}`,
          pr,
          homeworkFolder,
        };
      } catch (error) {
        throw error;
      }
    })
  );

  studentHomeworkCache.set(username, homeworkFoldersMapped);

  return homeworkFoldersMapped;
}

module.exports = {
  getClassPeerReviewGroups,
  getStudentHomework,
};
