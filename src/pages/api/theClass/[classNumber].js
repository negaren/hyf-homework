import utils from "../../../server/utils"
import classHomeworksController from "../../../server/class-homeworks.controller"

export default async function handler(req, res) {
    const classNumber = req.query.classNumber
    console.log("ja tak", classNumber)

    
    const classes = await utils.getClasses();
    if ( ! Object.keys(classes).find((key) => parseInt(key) === parseInt(classNumber))) {
        return res.status(404).json({ error: "The selected class is not active" });
    }
    // if (!(classNumber in classes)) {
    // }

    // try {

        const studentsInClass = classes[classNumber];
        if ( ! studentsInClass || studentsInClass && studentsInClass.length === 0) {
            res.status = 404
            res.json({error:"Found no students in that class"})
        }
        // const classHomeworks = await classHomeworksController.getHomeworks(
        //     classNumber,
        //     studentsInClass
        // );
        // console.log("classHomework", classHomeworks)
        // res.status = 200
        // res.json(classHomeworks);
        res.status = 200
        res.json({data:studentsInClass.map((githubUser) => ({student:githubUser}))});
    // try {

    // }
    // catch (err) {
        
    //     res.status = 404
    //     res.json({ error: err })
    // }
}