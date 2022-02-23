const fetch = require("node-fetch");

const utils = require("../utils");

const getPullRequestsFromApi = async (username) =>
  utils.getJsonFromUrl(
    `https://api.github.com/repos/${username}/hyf-homework/pulls?state=open`
  );

const getPullRequestFromBranchName = async (username, branchName) =>
  utils.getJsonFromUrl(
    `https://api.github.com/repos/${username}/hyf-homework/pulls?head=${username}:${branchName}&state=all`
  );

const getCommentsFromApi = async (username, pullRequestNumber) =>
  utils.getJsonFromUrl(
    `https://api.github.com/repos/${username}/hyf-homework/pulls/${pullRequestNumber}/comments`
  );

const getCommentsFromIssue = async (username, pullRequestNumber) =>
  utils.getJsonFromUrl(
    `https://api.github.com/repos/${username}/hyf-homework/issues/${pullRequestNumber}/comments`
  );

const getCommentsFromReview = async (username, pullRequestNumber) =>
  utils.getJsonFromUrl(
    `https://api.github.com/repos/${username}/hyf-homework/pulls/${pullRequestNumber}/reviews`
  );

const getStatus = (
  commentsFromMentors,
  hasUserCommittedAfterComment,
  pullRequest
) => {
  let status = "";
  // someone else than the user has made a comment on the pull request
  // Assume it is a mentor giving feedback
  if (pullRequest.merged_at) {
    status = "merged";
  } else {
    if (commentsFromMentors.length > 0) {
      // if the user has made a commit after the comment the homework is then approved
      if (hasUserCommittedAfterComment) {
        status = "approved";
      } else {
        status = "implement-feedback";
      }
    } else {
      status = "needs-feedback";
    }
  }

  return status;
};

const getCommits = async (username, pullRequestNumber) => {
  const commits = await utils.getJsonFromUrl(
    `https://api.github.com/repos/${username}/hyf-homework/pulls/${pullRequestNumber}/commits`
  );

  //commits.forEach((commit) => {});
  return commits;
};

// Comments can either come from issue id or pull request id.
// Because of rate limitation we here supply comments from PR id if there were no comments
// from issue id (super annoying)
const getComments = async (username, pullRequestNumber) => {
  let comments = await getCommentsFromApi(username, pullRequestNumber);

  if (typeof comments === "undefined" || comments.length < 1) {
    comments = await getCommentsFromIssue(username, pullRequestNumber);
  }

  if (typeof comments === "undefined" || comments.length < 1) {
    comments = await getCommentsFromReview(username, pullRequestNumber);
  }
  if (comments.length === 0) return [];

  Array.isArray(comments) && comments.forEach((comment) => {
    comment.createdBy = comment.login ? comment.login : comment.user.login;
    comment.created_at ? comment.created_at : comment.submitted_at;
  });

  return comments;
};

// Filter all comments with the comments from a mentor.
// Finds a mentor by checking if the comment creator is not in the class. Thereby we assume it is a mentor
const getCommentsFromMentors = (comments, studentsInClass) =>
  Array.isArray(comments) && comments.filter((comment) => {
    const isCommentCreatorInSameClassAsPRCreator = studentsInClass.includes(
      comment.createdBy
    );

    return !isCommentCreatorInSameClassAsPRCreator;
  });

// Filter all comments with the comments from a classmate
// Finds the comments by saying that the the commenter has to be in the same class, but not be the username
const getClassmateCommenters = (comments, username, studentsInClass) =>
  Array.isArray(comments) && comments
    .map(({ createdBy }) => createdBy)
    .filter((commentCreator) => {
      const isCommentCreatorInSameClassAsPRCreator = studentsInClass.includes(
        commentCreator.toLowerCase()
      );

      return (
        isCommentCreatorInSameClassAsPRCreator &&
        commentCreator.toLowerCase() !== username
      );
    });

// After the student got a comment from a mentor, did he make a new commit
const getHasUserCommittedAfterComment = (
  commentsFromMentors,
  commits,
  username
) => {
  if (!commits || commentsFromMentors.length === 0) return false;

  // Its a little weird that a commit has a commit key, but thats just the way github is built
  let commitByUserAfterCommentFromMentor = Array.isArray(commits) && commits.find(({ commit }) => {
    // This is fucked i know. The author.login is not always available. Why, i have no clue
    // Regex it please :)

    const commitUsername = commit.url
      .split("https://api.github.com/repos/")[1]
      .split("/hyf-homework/git")[0];

    const commitPostedAfterComment =
      new Date(commit.author.date) >
      new Date(commentsFromMentors[0].created_at);

    const commitWrittenByUser =
      commitUsername.toLowerCase() === username.toLowerCase();

    return commitWrittenByUser && commitPostedAfterComment;
  });

  const hasUserCommittedAfterComment = Boolean(
    commitByUserAfterCommentFromMentor
  );

  return hasUserCommittedAfterComment;
};

module.exports = {
  getPullRequestFromBranchName,
  getStatus,
  getCommits,
  getComments,
  getCommentsFromMentors,
  getClassmateCommenters,
  getHasUserCommittedAfterComment,
};
