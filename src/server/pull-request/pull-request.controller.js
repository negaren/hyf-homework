const fetch = require("node-fetch");

const utils = require("../utils");

const pullRequestHelper = require("./pull-request.helper");
const peerReviewHelper = require("./peer-review.helper");

const pullrequestController = {
  pullRequests: [],
  getPrDetails: async function (
    username,
    branchName,
    studentsInClass,
    classPeerReviewGroups,
    classNumber
  ) {
    // Throttling all the requests to github a little
    try {
      await utils.setTimeoutPromise(utils.randomIntFromInterval(1, 30));
      // The branchName is the folder name! So to get the PR for javascript/javascript2/week1
      // You simply find the PR with the branchname of javascript/javascript2/week1
      // The students do that through here: https://github.com/HackYourFuture-CPH/JavaScript/blob/master/javascript2/week1/homework.md#creating-the-branch

      // 
      // THIS SHOULD BE REMOVED ONCE CLASS 18 ENDS (still on old branch names)
      //
      const theRealBranchName = classNumber === 18 ? branchName : branchName.split("/").join("-")

      let thePR = await pullRequestHelper.getPullRequestFromBranchName(
        username,
        theRealBranchName//branchName
      );
      // console.log("gettings details", username, branchName, thePR)
      // console.log("the PR", thePR)

      const sortedHomework = (Array.isArray(thePR) ? thePR : [thePR]).map((pullRequest => {
        // reviewers that is not in the class is seen as a mentor
        const commentsFromMentors = pullRequestHelper.getCommentsFromMentors(
          pullRequest.comments,
          studentsInClass
        );

        const classmateCommenters = pullRequestHelper.getClassmateCommenters(
          pullRequest.comments,
          username,
          studentsInClass
        );

        // used to check if the student has done feedback
        const hasUserCommittedAfterComment = pullRequestHelper.getHasUserCommittedAfterComment(
          commentsFromMentors,
          pullRequest.commits,
          username
        );
        return ({
          // using all the above datan (comments, commits, classmate comments, mentor comments etc) figure out what the status of a PR is
          status: pullRequestHelper.getStatus(
            commentsFromMentors,
            hasUserCommittedAfterComment,
            pullRequest
          ),
          link: pullRequest.html_url,
          peerReviewStatus: peerReviewHelper.getPeerReviewStatus(
            username,
            classPeerReviewGroups,
            pullRequest.comments,
            branchName,
            classmateCommenters
          ),
          title: pullRequest.title,
        })
      }))

      if (sortedHomework.length === 1) {
        return sortedHomework[0]
      }
      else if (sortedHomework.length > 1) {
        return sortedHomework
      }
      else {
        return false
      }

      let pullRequest = thePR

      if (!pullRequest) return undefined;

      // Completing the pull request with the relevant data like fx standardized comments and commits
      pullRequest = {
        ...pullRequest,
        comments: await pullRequestHelper.getComments(
          username,
          pullRequest.number
        ),
        commits: await pullRequestHelper.getCommits(
          username,
          pullRequest.number
        ),
      };

      // reviewers that is not in the class is seen as a mentor
      const commentsFromMentors = pullRequestHelper.getCommentsFromMentors(
        pullRequest.comments,
        studentsInClass
      );

      const classmateCommenters = pullRequestHelper.getClassmateCommenters(
        pullRequest.comments,
        username,
        studentsInClass
      );

      // used to check if the student has done feedback
      const hasUserCommittedAfterComment = pullRequestHelper.getHasUserCommittedAfterComment(
        commentsFromMentors,
        pullRequest.commits,
        username
      );

      return {
        // using all the above datan (comments, commits, classmate comments, mentor comments etc) figure out what the status of a PR is
        status: pullRequestHelper.getStatus(
          commentsFromMentors,
          hasUserCommittedAfterComment,
          pullRequest
        ),
        link: pullRequest.html_url,
        peerReviewStatus: peerReviewHelper.getPeerReviewStatus(
          username,
          classPeerReviewGroups,
          pullRequest.comments,
          branchName,
          classmateCommenters
        ),
        title: pullRequest.title,
      };
    } catch (error) {
      console.log("get pr details error")
      console.log(error)
      throw error;
    }
  },
};

module.exports = pullrequestController;
