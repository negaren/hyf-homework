//Age-ify (A future age calculator)
let yearOfBirth;
let yearFuture;
yearOfBirth = 1985;
yearFuture = 2027;
const age = yearFuture - yearOfBirth;
console.log("You will be " + age + " years old in " + yearFuture);
//Goodboy-Oldboy (A dog age calculator)
let dogYearOfBirth;
let dogYearFuture;
dogYearOfBirth = 2017;
dogYearFuture = 2027;
const dogYear = dogYearFuture - dogYearOfBirth;
let shouldShowResultInDogYears = false;

if(shouldShowResultInDogYears === true){
    console.log("Your dog will be " + dogYear + " human years old in " + dogYearFuture);
} else {
    console.log("Your dog will be " + dogYear*7 + " dog years old in " + dogYearFuture);
}
//Housey pricey (A house price estimator)
let width;
let heigth;
let depth;
let volumeInMeters;
let gardenSizeInM2;
let houseCost;
width = 8;
heigth = 10;
depth = 10;
houseCost = 2500000;
gardenSizeInM2 = 100;
volumeInMeters = width * heigth * depth;
let housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
let friendName = "Peter";
if (houseCost<=housePrice){
    console.log(`"The house cost is reasonable for " + ${friendName}`)
}else{
    console.log("The house cost is too much for " + `${friendName}`)
}
width = 5;
heigth = 8;
depth = 11;
houseCost = 1000000;
gardenSizeInM2 = 70;
volumeInMeters = width * heigth * depth;
housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
friendName = "Julia";
if (houseCost<=housePrice){
    console.log("The house cost is reasonable for " + `${friendName}`)
}else{
    console.log("The house cost is too much for " + `${friendName}`)
}
//Ez Namey (Startup name generator) Optional
const firstWords = ["Food", "Fast", "Delicious", "Fresh", "Hello", "Hygge", "Fly", "Healthy", "Yummy", "Dreamed"];
const secondWords = ["Fresh", "Delivery", "Food", "Fresh", "Foody", "Time", "Meal", "For you", "Plate", "Portion"];
const randomNumber = Math.floor(Math.random() * 10);
let startupName;
startupName = firstWords[randomNumber] + " " + secondWords[randomNumber];
console.log("The suggested start up name is: " + startupName + ". Its contains: " + startupName.length + " characters.");

