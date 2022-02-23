const classHomeworksHelper = require("./class-homeworks.helper");

// This function gets the individual students homeworks for each homework week, with a status attached to it
// A homeworks week can have multiple homeworks (some students have multiple PR's with changes to the same folders. This is
// off course a mistake but it can happen never the less)
async function getHomeworks(classNumber, studentsInClass) {
  try {
    // const classPeerReviewGroups = await classHomeworksHelper.getClassPeerReviewGroups(
    //   classNumber
    // );

    const studentsClassWork = await Promise.all(
      studentsInClass.map(async (student) => {
        try {
          const homeworkWeeks = await classHomeworksHelper.getStudentHomework(
            student,
            studentsInClass,
            false// classPeerReviewGroups
          );
          return {
            student,
            homeworkWeeks,
          };
        } catch (error) {
          console.log(error)
          return null;
        }
      })
    );

    return studentsClassWork;
  } catch (error) {
    throw error;
  }
}

async function getStudentHomework(student, classNumber) {
  const homeworkWeeks = await classHomeworksHelper.getStudentHomework(
    student,
    false, //studentsInClass,
    false, // classPeerReviewGroups
    classNumber// classnumber
  );
  return {
    student,
    homeworkWeeks,
  };
}

module.exports = { getHomeworks, getStudentHomework };
