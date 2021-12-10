//1- Log out the text Called after 2.5 seconds 2.5 seconds after the script is loaded.
const myScript = document.querySelector('script');
myScript.onload = () => {
    setTimeout(() => {
        console.log("Called after 2.5 seconds 2.5 seconds")
    }, 2500);
}


//2- Create a function that takes 2 parameters: delay and stringToLog. 

function delayedPrint(delay, stringToLog) {
    const timeOut = delay * 1000;
    setTimeout(() => {
        console.log(stringToLog)
    }, timeOut)
}

delayedPrint(5, "This string logged after 5 seconds.");
delayedPrint(3, "This string logged after 3 seconds.");

//3- Create a button in html. When clicking this button, use the function you created in the previous task to log out the text: Called after 5 seconds 

const delayButton = document.getElementById('firstButton');

delayButton.addEventListener('click', () => {
    delayedPrint(5, "Called after 5 seconds")
});

//4- Create two functions and assign them to two different variables.

const earth = function earthLogger() {
    console.log("Earth");
}

const saturn = function saturnLogger() {
    console.log("Saturn");
}

function planetLogFunction(planet) {
    planet();
}
planetLogFunction(earth);
planetLogFunction(saturn);

// 5- Create a button with the text called "Log location". When this button is clicked the location (latitude, longitude) of the user should be logged out using this browser api

const locationBtn = document.createElement('button');
locationBtn.textContent = 'Log location';
const mainBody = document.getElementById('location-btn');
mainBody.appendChild(locationBtn);

locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(success, error);

})

function success(pos) {
    var crd = pos.coords;

    console.log(`Your current position is: Latitude : ${crd.latitude} Longtitude : ${crd.longitude}`);
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

//6

let mapBtn = document.getElementById("map-location");
const locationLink = document.createElement('a');
mapBtn.appendChild(locationLink);
mapBtn.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        mapBtn.href = onclick = window.open(`https://maps.google.com/maps?q=${lat},${long}&hl=es;z=14&amp;output=embed`);
    });
});

//7- Create a function called runAfterDelay. It has two parameters: delay and callback. 

function runAfterDelay(delay, callback) {
    const myDelay = delay * 1000;
    setTimeout(() => callback(), myDelay)
}
runAfterDelay(4, function () {
    console.log('Should be logged after 4 seconds.')
})

runAfterDelay(6, function () {
    console.log('Should be logged after 6 seconds.')
})

// 8- Check if we have double clicked on the page. A double click is defined by two clicks within 0.5 seconds.

// window.addEventListener('dblclick', () => {
//     console.log("Double Click")
// })

let tCounter = 0;
window.addEventListener('click', () => {
    ++tCounter;
    setTimeout(() => {
        if (tCounter % 2 == 0) {
            console.log("Double Click")
        }
    }, 500)
})

// 9- Create a function called jokeCreator 

function jokeCreator(shouldTellFunnyJoke, x, y) {
    if (shouldTellFunnyJoke == true) {
        return x();
    }
    return y();
}
const logFunny = function logFunnyJoke() {
    console.log('This is a funny joke');
}
const logUkh = function logBadJoke() {
    console.log('This is a bad joke');
}
jokeCreator(true, logFunny, logUkh);

// Function as a variable
//Create an array with 3 items. All items should be functions. Iterate through the array and call all the functions.

const callBakF1 = function myFunction1() {
    return "F1"
}
const callBakF2 = function myFunction2() {
    return "F2"
}
const callBakF3 = function myFunction3() {
    return "F3"
}

const functionArr = [callBakF1, callBakF2, callBakF3];
functionArr.forEach(Element => { console.log(Element()) })

// Create a function as a const and try creating a function normally. 

function printMyName(name) {
    return `My name is: ${name}`
}

const PrintMyFamily = () => {
    return 'My family is: Eghbali'
}

console.log(PrintMyFamily());
console.log(printMyName('Negar'));

// The fastest presser in this realm

const gameInput = document.getElementById('game-input');
const gameButton = document.getElementById('game-button');
let lKeyCounter = 0;
let sKeyCounter = 0;
const lcounter = document.createElement('output');
const lSpan = document.getElementById('ls-child');
lSpan.appendChild(lcounter);
const scounter = document.createElement('output');
const rSpan = document.getElementById('rs-child');
rSpan.appendChild(scounter);
lcounter.innerText = 0;
scounter.innerHTML = 0;
const gameWinnerMessage = document.getElementById('winner-message');

gameButton.addEventListener('click', myGameFunction => {
    const mygameinput = document.getElementById('game-input').value;
    console.log(mygameinput);
    if (mygameinput > 0) {
        document.addEventListener('keypress', function onevent(event) {
            if (event.key == "l") {
                lKeyCounter += 1;
                lcounter.innerText = lKeyCounter;
            }
            else if (event.key == "s") {
                sKeyCounter += 1;
                scounter.innerHTML = `${sKeyCounter}`;
            }

            setTimeout(() => {
                document.getElementById('game-input').value = "";
                console.log(lcounter)
                if (lKeyCounter > sKeyCounter) {
                    document.getElementById('winner-message').value = 'The wiiner is L player';
                }
                else if (lKeyCounter < sKeyCounter) {
                    document.getElementById('winner-message').value = "The winner is S player"
                }
                else if (lKeyCounter == sKeyCounter && lKeyCounter != 0) {
                    document.getElementById('winner-message').value = "The winner is both of you!"
                }
                lKeyCounter = 0;
                sKeyCounter = 0;
                lcounter.innerHTML = 0;
                scounter.innerHTML = 0;
                console.log(scounter.value);
                document.removeEventListener('keypress', onevent);
            }, mygameinput * 1000);
        })

    }
    else
        alert("Please insert a valid value as game duration.")
})


