console.log("inside warmup file");
// circle calculator

class circle {
    constructor(radius){
        this.radius = radius;
    }
    getDiameter(){
        return 2 * this.radius;
    }
    getCircumference(){
        return 2 * 3.141 * this.radius;
    }
    getArea(){
        return 3.141 * 3.141 * this.radius;
    }
}

const circleOne = new circle(10);
console.log(circleOne.getDiameter()); 
const circleTwo = new circle(100);
console.log(circleTwo.getArea());
console.log(circleTwo.getCircumference());
console.log(circleTwo.getDiameter());

// Meal Sharing