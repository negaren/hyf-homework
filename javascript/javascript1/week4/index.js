let userName = [];
let toDo = [];
let sosDraftToDo = [];
function getReply(command) {
    let wordArr = command.split(" ");

    if (command.includes("my name is")) {
        for (let value of wordArr) {
            if (userName.includes(value)) {
                return "I know your name";
            } else if (value == wordArr[4]) {
                userName.push(value);
                console.log(userName);
                return "nice to meet you " + `${userName[userName.length - 1]}`;
            }
        }
    } else if (command.includes("is my name")) {
        if (wordArr.length == 0) {
            return "Please introduce yourself"
        } else {
            return "Your name is " + `${userName[userName.length - 1]}`;
        }
    } else if (command.includes("add")) {
        let draftToDo = [];
        let toDoStr = "";
        for (let i = 1; i < wordArr.length - 3; i++) {
            draftToDo.push(wordArr[i]);
        }
        if (draftToDo.length > 1) {
            toDoStr = draftToDo.join(" ");
            toDo.push(toDoStr);
            console.log(toDo);
            return `${toDoStr}` + " is added to your todo";
        } else {
            toDoStr = draftToDo[0];
            toDo.push(toDoStr);
            console.log(toDo);
            return `${toDoStr}` + " is added to your todo";
        }
        //Remove fishing from my todo
    } else if (command.includes("remove")) {
        let todoRemove = [];
        let itemToRemove = "";
        for (let i = 1; i < wordArr.length - 3; i++) {

            todoRemove.push(wordArr[i]);
        }

        if (todoRemove.length > 1) {
            itemToRemove = todoRemove.join(" ");
            console.log(itemToRemove);
        } else {
            itemToRemove = todoRemove[0];
            console.log(itemToRemove);
        }

        for (let value of toDo) {
            if (value !== itemToRemove) {
                sosDraftToDo.push(value);
            }
        }
        //assigning new array value to toDo
        toDo = sosDraftToDo;
        console.log(toDo);
        return "Removed " + `${itemToRemove}` + " from your todo";

    }//What is on my todo?
    else if (command.includes("what is on my todo")) {
        return `${toDo}`;
    }
    //What day is it today?
    else if (command.includes("what day")) {
        let draftDate = [];
        var today = new Date();
        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        draftDate = date.split("-");
        let month = "";
        switch (draftDate[1]) {
            case "1":
                month = "January";
                break
            case "2":
                month = "February"
                break
            case "3":
                month = "March";
                break
            case "4":
                month = "April"
                break
            case "5":
                month = "May";
                break
            case "6":
                month = "June"
                break
            case "7":
                month = "July";
                break
            case "8":
                month = "August"
                break
            case "9":
                month = "September";
                break
            case "10":
                month = "October"
                break
            case "11":
                month = "November";
                break
            case "12":
                month = "December"
                break
        }
        console.log(draftDate);
        return `${draftDate[2]}` + " of " + `${month} ${draftDate[0]}`;
    } else if (command.includes("+") || command.includes("-") || command.includes("/") || command.includes("*")) {
        const num1 = parseInt(wordArr[2]);
        const num2 = parseInt(wordArr[4]);
        let result = 0;
        switch (wordArr[3]) {
            case "+":
                result = num1 + num2;
                break
            case "-":
                result = num1 - num2;
                break
            case "/":
                result = num1 / num2;
                break
            case "*":
                result = num2 * num1;
        }
        return result + "";
    } else if (command.includes("timer")) {
        const timerNum = parseInt(wordArr[wordArr.length - 2]);//getting the asked timer string and convert to number
        setTimeout(setAlert, timerNum * 1000);
        return "Timer set for " + `${timerNum}` + " seconds";
    }
}
function setAlert() {
    alert("Timer Done!");
}
console.log(getReply("Hello my name is Benjamin Middle name fraklin"));
console.log(getReply("Hello my name is Nick")); // toc make sure the name does not exist in the array
console.log(getReply("What is my name?"));
console.log(getReply("add fishing to my todo"));
//Add singing in the shower to my todo
console.log(getReply("add singing in the shower to my todo"));
console.log(getReply("remove fishing from my todo"));
console.log(getReply("remove singing in the shower from my todo"));
console.log(getReply("what is on my todo?"));
console.log(getReply("what day is today?"));
console.log(getReply("what is 4 - 2"));
console.log(getReply("set a timer for 0010 seconds"))
console.log(getReply("what day is today?"));
console.log(getReply("hello my name is Negar"));

