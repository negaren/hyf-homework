//#1 Item array removal-----------------------------------------------------------------------
const names = [
    "Peter",
    "Ahmad",
    "Yana",
    "kristina",
    "Rasmus",
    "Samuel",
    "katrine",
    "Tala",
];
const nameToRemove = "Ahmad";
for (let i = 0; i < names.length; i++) {
    if (names[i] === nameToRemove) {
        names.splice(i, 1)
    }
}

// Code done

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']

//#2 When will we be there??-----------------------------------------------------------------------
const travelInformation = {
    speed: 50,
    destinationDistance: 432,
};
function TVT() {
    var decimalTimeString = travelInformation.destinationDistance / travelInformation.speed;
    const minuteNumber = Math.trunc((decimalTimeString - Math.trunc(decimalTimeString)) * 60);
    return (Math.trunc(decimalTimeString) + " hours and " + minuteNumber + " minutes");
}
const travelTime = TVT(travelInformation);
console.log(travelTime); // 8 hours and 38 minutes

//#3 Series duration of my life-----------------------------------------------------------------------

const seriesDurations = [
    {
        title: "Game of thrones",
        days: 3,
        hours: 1,
        minutes: 0,
    },
    {
        title: "Sopranos",
        days: 3,
        hours: 14,
        minutes: 0,
    },
    {
        title: "The Wire",
        days: 2,
        hours: 12,
        minutes: 0,
    },
];
seriesDurations[1].title = "Modern Family";
seriesDurations[1].days = 4;
seriesDurations[1].hours = 8;
seriesDurations[1].minutes = 1;
seriesDurations[2].title = "The Kominsky Method";
seriesDurations[2].days = 4;
seriesDurations[2].hours = 17;
seriesDurations[2].minutes = 19;
console.log(seriesDurations)
let totalPercentage = 0;
function tvTime() {
    for (let i = 0; i < seriesDurations.length; i++) {
        const percentageOfTvTime = (((seriesDurations[i].days + ((seriesDurations[i].minutes / 60) + seriesDurations[i].hours) / 24) / (80 * 365)) * 100).toFixed(2);
        console.log(`${seriesDurations[i].title} took ${percentageOfTvTime}% of my life`)
        totalPercentage += parseFloat(percentageOfTvTime);
        //totalPercentage += percentageOfTvTime;
        //why in the line 72 if I do not convert it to number the result would be a sting?
    }
    console.log(`In total that is ${totalPercentage}% of my life.`)
};
tvTime();

//Smart-ease - Back to the basics!-----------------------------------------------------------------------
//NOnoN0nOYes (Note taking app)
//Save a note
var notes = [];
function saveNote(content, id) {
    notes.push({ content, id });
}
saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
console.log(notes);
//Get a note
function getNote(id) {
    for (let i = 0; i < notes.length; i++) {
        if (id === notes[i].id) {
            return notes[i].content;
        }
        else if (i == notes.length - 1) {
            return "The entered value is not valid!"
        }
    }
}

let firstNote = getNote(1);
console.log(firstNote); // {content: 'Pick up groceries', id: 1}
firstNote = getNote(2);
console.log(firstNote);
firstNote = getNote('2');
console.log(firstNote);
//Log out notes
function logOutNotesFormatted() {
    for (let i = 0; i < notes.length; i++) {
        console.log(`The note with id: ${notes[i].id}, has the following note text: ${notes[i].content}`);
    }
}

logOutNotesFormatted();
//Unique feature
// https://codepen.io/Negaren/pen/yLoqXqo
//-----------------------------------------------------------------------------------------------------------------
//CactusIO-interactive (Smart phone usage app) optional
//Adding an activity
let activities = [];
function addActivity(Date, activity, duration) {
    if (typeof Date === "string" && typeof activity === "string" && typeof duration === "number") {
        if (showStatus(activities) == true) {
            console.log("You have reached your limit, no more smartphoning for you!");
        } else {
            activities.push({ Date, activity, duration });
            console.log(activities);
        }
    } else {
        console.log("The datatype is not valid");
    }
}
addActivity("23/7-18", "Youtube", 30);
addActivity("23/7-18", "Instagram", 20);
addActivity("23/7-18", "LinkedIn", 30);
addActivity("23/7-18", "Facebook", 10);
//Show my status******************************
function showStatus() {
    let sumOfDuration = 0;
    if (activities.length == 0) {
        console.log("Add some activities before calling showStatus");//comment lines 130-1-2 to get this line as output
    } else {
        for (const value in activities) {
            sumOfDuration += activities[value].duration;
        }
        console.log(`You have added ${activities.length} activities. They amount to ${sumOfDuration} min. of usage`);
        if (sumOfDuration >= 80) {
            return true;
        }
    }
}
showStatus(activities);
//Usage limit***********************************
//please check line 124-125, I added the condition to prevent adding new activity after reaching the max time

//Extra feature *********************************** 
// I have defined new line of codes instead of edditing previous lines of code

let activities1 = [];
var todayDate = new Date();
function addActivity1(activity, duration) {
    if (typeof activity === "string" && typeof duration === "number") {
        if (showStatus1(activities1) == true) {
            console.log("You have reached your limit, no more smartphoning for you!");
        } else {
            activities1.push({ todayDate, activity, duration });
            console.log(activities1);
        }
    } else {
        console.log("The datatype is not valid");
    }
}
addActivity1("Youtube", 30);
addActivity1("Instagram", 20);
addActivity1("LinkedIn", 30);
addActivity1("Facebook", 10);

function showStatus1() {
    let sumOfDuration = 0;
    if (activities1.length == 0) {
        console.log("Add some activities before calling showStatus1");//comment lines 130-1-2 to get this line as output
    } else {
        for (const value in activities1) {
            sumOfDuration += activities1[value].duration;
        }
        console.log(`You have added ${activities1.length} activities. They amount to ${sumOfDuration} min. of usage`);
        if (sumOfDuration >= 80) {
            return true;
        }
    }
}
//Create a function for calculating the activity a user has spent the most time on.

function timeConsumingApp() {
    let maxActivity = 0;
    for(value1 in activities1){
     maxActivity = Math.max(activities1[value1].duration);//finding the max number of duration 
}
for(value2 in activities1){
    if(activities1[value2].duration==maxActivity){//check if there are more than 1 app that consume max time 
        console.log(`The most time consuming activity is: ${activities1[value2].activity} and the duration is: ${maxActivity}`);
    }
}
    
}
timeConsumingApp();

