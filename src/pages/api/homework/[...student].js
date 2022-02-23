import classHomeworksController from "../../../server/class-homeworks.controller"

export default async function handler(req, res) {
    const [student,classNumber] = req.query.student

    const homework = await classHomeworksController.getStudentHomework(student, parseInt(classNumber))
    res.status = 200
    res.json({data:homework});
    
}