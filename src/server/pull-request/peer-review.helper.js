const getPeerReviewStatus = (
  usernameToReceiveReview,
  classPeerReviewGroups,
  comments,
  homeworkFolder,
  classmateCommenters
) => {
  let peerReviewStatus = {
    hasReceivedFeedback: false,
    classmatesToReceiveFeedbackFrom: [],
  };
  try {
    if (homeworkFolder === undefined) return;

    // Find the groups for the homeworks this PR affects
    const peerReviewGroupsForHomeworkWeek = classPeerReviewGroups.homeworkFolders.find(
      (homeworkFolderFromPeerReviews) =>
        homeworkFolderFromPeerReviews.homeworkFolder === homeworkFolder
    ).peerGroups;

    const groupUsernameBelongsTo = peerReviewGroupsForHomeworkWeek.find(
      (group) => group.includes(usernameToReceiveReview)
    );

    const classmatesToReceiveFeedbackFrom = groupUsernameBelongsTo.filter(
      (personInGroup) => personInGroup !== usernameToReceiveReview
    );

    peerReviewStatus = {
      hasReceivedFeedback:
        utils.arrayIntersect(
          classmateCommenters,
          classmatesToReceiveFeedbackFrom
        ).length > 0,
      classmatesToReceiveFeedbackFrom,
    };
  } catch (error) {
    // console.log(error);
  }

  return peerReviewStatus;
};

module.exports = { getPeerReviewStatus };
