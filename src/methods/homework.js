export default {
    "query":function(classNumber) {
        return fetch("/api/theClass/"+classNumber).then((rsp) => rsp.json())
    },
    "homework":function(student,classNumber) {
        return fetch("/api/homework/"+student+"/"+classNumber).then((rsp) => rsp.json()).catch((err) => {
            console.log("parse error")
        })
    }
}