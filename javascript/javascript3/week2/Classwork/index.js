console.log("Hi")


fetch('https://yesno.wtf/api')
    .then(response => response.json)
    .then(data => console.log(data))

// Exrcise 1,2
async function asyncFunction() {
    try {
        const yesNoPromise = await fetch('https://yesno.wtf/api');
        const data = await yesNoPromise.json();
        console.log(data.answer);
    } catch (error) {
        console.log(error)
    }
}
asyncFunction();

// Exrcise 3
// const trueFalse = false;
// function delayAsyn() {
//     const promise4Delay = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (trueFalse) {
//                 resolve("Hello")
//                 console.log("Hello");
//             } else {
//                 reject(`Error during setup`);
//                 console.log(`Error during setup`);
//             }
//         }, 4000)
//     })
// } delayAsyn();

// Exrcise 3
const trueFalse2 = false;
function delayAsyn2() {
    const promise4Delay2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (trueFalse2) {
                resolve("Hello")
                console.log("Hello");
            } else {
                promise4Delay2
                .catch(error => console.log(error));
   
            }
        }, 4000)
    })
} delayAsyn2();

// Exrcise 3
const conditionCheck = false;
const Promise3 = new Promise((resolve, reject) => {
    setTimeout (() => {
        if (conditionCheck){
            resolve ("Hello")
        }else {
            reject ("Error ocured!")
        }
        
    }, 4000)
})

async function exer3Function (){
    try {
        await Promise3;
        console.log(Promise3);
    }catch (error){
        console.log(error);
    } 
}
exer3Function();

// Exercise 4

const randomNum = Math.floor (Math.random * 3);
const promise4 = new Promise ((resolve, reject) => {
    setTimeout (() => {
        if (randomNum == 0){
            resolve ("No")
        } else if (randomNum == 1){
            resolve ("Yes")
        }else {
            reject ("Out of the scope error")
        }
    }, 4000)
})

async function randomNumberFunc (){
    try {
        await promise4;
        console.log(promise4);
    }catch(error) {
        console.log(error)
    }
}
randomNumberFunc();

