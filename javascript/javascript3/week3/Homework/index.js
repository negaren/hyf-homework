// Lets make some art using classes
// Paint a circle to a canvas element

var canvas = document.getElementById("hidden");
var ctx = canvas.getContext("2d");
canvas.width = hidden.clientWidth;
canvas.height = hidden.clientHeight;
var ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.drawImage(hidden,
    0, 0, this.naturalWidth, this.naturalHeight,
    0, 0, hidden.clientWidth, hidden.clientHeight)
function w() { return window.innerWidth; }
ctx.strokeStyle = 'red';
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

//Class creation time!
class Circle {
    constructor(ctx1, ctx2, ctx3, ctx4, ctx5, ctx6) {
        this.ctx1 = ctx1;
        this.ctx2 = ctx2;
        this.ctx3 = ctx3;
        this.ctx4 = ctx4;
        this.ctx5 = ctx5;
        this.ctx6 = ctx6;
    }
    draw() {
        ctx.strokeStyle = this.ctx6;
        ctx.fillStyle = this.ctx6;
        ctx.beginPath();
        ctx.arc(this.ctx1, this.ctx2, this.ctx3, this.ctx4, this.ctx5 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}


// const c1 = new Circle(50, 50, 20, 0, 2 * Math.PI, "#000000");
// // calling the circle class drw() method is drawing the black circle
// c1.draw();
// // trying with another radius
// const c2 = new Circle(200, 200, 50, 5, 2 * Math.PI, "#FF00FF");
// c2.draw();

// Now lets make art!
function xyRandom() { return Math.floor(Math.random() * w()); }
function radiusRandom() { return Math.floor(Math.random() * 100); }

function generateRandomColor() {
    const maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    const randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}
async function cilcleArt() {
    setTimeout(() => {
        const c2 = new Circle(xyRandom(), xyRandom(), radiusRandom(), 10, 2 * Math.PI, generateRandomColor());
        c2.draw();
        callCircle()
    }, 2000)
}

async function callCircle() {
    await cilcleArt()
}
callCircle()

// circle art by mouse movement
function myFunction(e) {
    const x = e.clientX;
    const y = e.clientY;
    console.log(x , y);
    const c2 = new Circle(x, y, radiusRandom(), 10, 2 * Math.PI, generateRandomColor());
    c2.draw();
}