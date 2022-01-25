
const redBox = document.querySelector('ul.marks li:nth-child(1)');
const blueBox = document.querySelector('ul.marks li:nth-child(2)');
const greenBox = document.querySelector('ul.marks li:nth-child(3)');
var redY = redBox.offsetTop;
var redX = redBox.offsetLeft;
var xr = 20 - redX;
var yr = 300 - redY;

var blueY = blueBox.offsetTop;
var blueX = blueBox.offsetLeft;
var xb = 400 - blueX;
var yb = 300 - blueY;

var greenY = greenBox.offsetTop;
var greenX = greenBox.offsetLeft;
var xg = 400 - greenX;
var yg = 20 - greenY;

// translateOneByOne

async function translateOneByOne() {

    await moveElement(redBox, { x: xr, y: yr }).then(() => {
        console.log("Element has been moved");
    });

    await moveElement(blueBox, { x: xb, y: yb }).then(() => {
        console.log("Element has been moved");
    });

    await moveElement(greenBox, { x: xg, y: yg }).then(() => {
        console.log("Element has been moved");
    });
}


const delayPromise = new Promise((resolve) => {
    setTimeout(3000);
    resolve();
})

async function translateAllAtOnce() {
    await delayPromise;
    await Promise.all([moveElement(redBox, { x: 0, y: 0 }), moveElement(blueBox, { x: 0, y: 0 }), moveElement(greenBox, { x: 0, y: 0 })]);
    console.log('Elements are moved');
    await Promise.all([moveElement(redBox, { x: xr, y: yr }), moveElement(blueBox, { x: xb, y: yb }), moveElement(greenBox, { x: xg, y: yg })]);
} 

async function callTranslations(){
    await translateOneByOne();
    await translateAllAtOnce();
}
callTranslations();