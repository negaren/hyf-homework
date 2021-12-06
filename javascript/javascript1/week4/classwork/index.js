function fizzBuzz() {
    for (i = 1; i < 101; i++) {
        if (i % 3 === 0 && i % 15 !== 0) {
            console.log("Fizz");
        }
        else if (i % 5 === 0 && i % 15 !== 0) {
            console.log('Buzz');
        }
        else if (i % 15 === 0) {
            console.log('FizzBuzz');
        } else {
            console.log(`${i}`);
        }
    }
}
fizzBuzz();

//******************************** */
function fizzBuzz1(num1, num2) {
    for (i = 1; i < 101; i++) {
        if (i % num1 === 0 && i % num2 * num1 !== 0) {
            console.log("Fizz1");
        }
        else if (i % num2 === 0 && i % num2 * num1 !== 0) {
            console.log('Buzz1');
        }
        else if (i % num2 * num1 === 0) {
            console.log('FizzBuzz1');
        } else {
            console.log(`${i}`);
        }
    }
}
fizzBuzz1(4, 12);

//Build a sentiment analyzer 'I am mega super awesome happy'*******************************
const possitiveArr = ['super', 'happy', 'awesome'];
const negativeArr = ['deadly', 'negative'];
let pcountDown = 0;
let ncountDown = 0;
function sentenceCheck(mySentence) {
    let newParr = [];
    let newNarr = [];
    for (let i = 0; i < possitiveArr.length; i++) {
        var psentence = mySentence.includes(possitiveArr[i]);
        if (psentence == true) {
            pcountDown += 1;
            newParr.push(possitiveArr[i]);
        }
    }
    console.log(`The positive score is: ${pcountDown}`);
    console.log(newParr);
    for (let j = 0; j < negativeArr.length; j++) {
        var nsentence = mySentence.includes(negativeArr[j]);
        if (nsentence == true) {
            ncountDown += 1;
            newNarr.push(negativeArr[j]);
        }
    }
    console.log(`The negative score is: ${ncountDown}`);
    console.log(newNarr);

}
sentenceCheck('I am mega super awesome happy negative');
//An example for map *******************************

const arr=[1, 2, 3];
const narr=arr.map(function(n){
    return n*2

})
console.log(narr)