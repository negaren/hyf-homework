//Flight booking fullname function----------------------------------------------------------
function getFullname(firstname, surname, useFormalName) {
    if (useFormalName) {
        console.log("Lord/Lady " + firstname + " " + surname);
    } else {
        console.log(firstname + " " + surname);
    }
}
getFullname("Negar", "Namini", true);
getFullname("Negar", "Namini", false);


//Flight booking fullname function - Second method
function getFullname2(firstname, surname, useFormalName) {
    if (useFormalName) {
        return "Lord/Lady " + firstname + " " + surname;
    } else {
        return firstname + " " + surname;
    }
}

let fullname1 = getFullname2("Negar", "Namini", true);
let fullname2 = getFullname2("Negar", "Namini");
console.log(fullname1);
console.log(fullname2);

//.Event application------------------------------------------------------------------------
let today = new Date();
const weekDays = ["Monday", "Tuesday", "Wednesday", "Tursday", "Friday", "Saturday", "Sunday"]
function getEventWeekday(dayNumber) {
    const toDayNumber = today.getDay();
    if (dayNumber == 7) {
        console.log("Today is " + '"', weekDays[toDayNumber - 1], '"' + " and the event day is a week later the same day!");
    } else if (dayNumber < 7) {
        console.log("Today is " + '"', weekDays[toDayNumber - 1], '"' + " and the event day is on:" + '"', weekDays[toDayNumber + dayNumber - 1], '"');
    } else {
        console.log("Today is " + '"', weekDays[toDayNumber - 1], '"' + " and the event day is on: " + '"', weekDays[(dayNumber % 7) + toDayNumber - 1], '"');
    }
}
getEventWeekday(9)
getEventWeekday(7)
getEventWeekday(2)

//Weather wear--------------------------------------------------------------------------------------
function whatToWear(temprature) {
    if (temprature < 10) {
        console.log("Better to wear an overcoat, shall, gloves and two socks!");
    } else if (10 <= temprature && temprature < 19) {
        console.log("Better to wear your rain coat");
    }
    else {
        console.log("Wear nothing if it's possible");
    }
}
whatToWear(0);
whatToWear(11);
whatToWear(26);
//Weather wear second--------------------------------------------------------------------------------------
function whatToWear1(temprature) {
    if (temprature < 10) {
        return "Better to wear an overcoat, shall, gloves and two socks!";
    } else if (10 <= temprature && temprature < 19) {
        return "Better to wear your rain coat";
    }
    else {
        return "Wear nothing if it's possible";
    }
}
const clothesToWear = whatToWear1(18);
console.log(clothesToWear + "in second try");

//Student manager--------------------------------------------------------------------------------------
//addStudentToClass function
const class07Students = [];
function getNumberOfStudents() {
    return class07Students.length;
}
function addStudentToClass(studentName) {
    for (let i = 0; i < 7; i++) {
        if (studentName == class07Students[i]) {
            console.log("Student " + studentName + " is already in the class")
            return
        }
    }
    if (getNumberOfStudents() == 6 && studentName == "Queen") {
        class07Students.push(studentName)
        console.log(class07Students);
    } else if (getNumberOfStudents() == 6 && studentName !== ("Queen")) {
        console.log("Cannot add more students to class 07")
    } else if (getNumberOfStudents() > 6) {
        console.log("Cannot add more students to class 07")
    }else if (getNumberOfStudents()<6 && studentName!== "") {
        class07Students.push(studentName)
        console.log(class07Students);
    } 
}
addStudentToClass("Negar")
addStudentToClass("")
addStudentToClass("Negar")
addStudentToClass("Mani")
addStudentToClass("Jette")
addStudentToClass("Zippora")
addStudentToClass("Annet")
addStudentToClass("Linda")
addStudentToClass("Elvis")
addStudentToClass("Queen")
addStudentToClass("Queen")


//addCandy function-----------------------------------------------------------------------------------------
//sweet, chocolate, toffee or chewing-gum
let boughtCandyPrices = [];
function addCandy(candyType, weight){
    if (canBuyMoreCandy()){
        console.log("You can buy more, so please do!")
    }else {
        console.log("Enough candy for you!")  
        
    }
    switch(candyType){
        case "Sweet":
        boughtCandyPrices.push(0.5*weight);
        console.log(boughtCandyPrices);
        break
        case "chocolate":
            boughtCandyPrices.push(	0.7*weight);
            console.log(boughtCandyPrices);
        break
        case "toffee":
            boughtCandyPrices.push(1.1*weight);
            console.log(boughtCandyPrices);
        break
    }
}
addCandy("Sweet", 10)
addCandy("chocolate", 10)
addCandy("toffee", 10)
//Can i buy more?------------------------------------------------------------------------
function canBuyMoreCandy(){
    let amountToSpend = Math.random() * 100;
    let totalPrice = 0;
    for (let i=0; i<boughtCandyPrices.length; i++){
        totalPrice +=boughtCandyPrices[i];
    }
    if (amountToSpend<totalPrice){
        return true;
        
    }else{
        return false;
       
    }
}
addCandy("Sweet", 10)
addCandy("chocolate", 10)
addCandy("toffee", 10)


