//Find the shortest word
const danishWords = ["bil", "plante", "kaffe", "bog", "ø", "planetarium"];
let spareArr = [];
function shortestWord(myArr) {
    for (let key in myArr) { //search in the value of the function which is an array
        let wordLength = myArr[key].length; //getting the length of the arrays element
        if (spareArr.length < 1) { // check if the spare array contain a word 
            spareArr.push(myArr[key]); // if it does not it can be pushed by the new shortest word
        } else {
            if (spareArr[0].length > wordLength) { // checking if the existing word length is longer than the new word length
                spareArr = []; // if yes the array will be reset
                spareArr.push(myArr[key]); // the new shortest word would be replaced
                // check the condition of words with equal and prevent to have itterative words
            } else if (spareArr[0].length == myArr[key].length && spareArr[0] !== myArr[key]) {
                spareArr.push(myArr[key]); // pushing different word with equal length in the array, for test the result please add "p" to the danishWords array
            }
        }
    }
    const finalStr = spareArr.toString(""); // to print an string instead of array
    return finalStr;

}

console.log(shortestWord(danishWords)); // returns 'ø'

// Find and count the Danish letters ***********************************************************************************************************************************
//Find the individual number and the total number of Danish letters in a string.

const danishLetters = ["æ", "ø", "å"]
function danishLetterCounter(sentence) {

    const str = sentence.toLowerCase();
    const oCounter = (str.match(/ø/g) || []).length;
    const aeCounter = (str.match(/æ/g) || []).length;
    const aCounter = (str.match(/å/g) || []).length;
    total = aeCounter + aCounter + oCounter;
    const result = [{ "total": total, "æ": aeCounter, "ø": oCounter, "å": aCounter }];
}
const danishString = "Jeg har en blå bil";
danishLetterCounter(danishString); // returns {total: 1, å: 1}

const danishString2 = "Blå grød med røde bær";
danishLetterCounter(danishString2); // returns {total: 4, æ: 1, ø: 2, å: 1}


//Spirit animal name generator ********************************************************************************************************************************

const userName = "";
const spiritAnimal = ["Emotional Bear", "Butterfly", "Deer", "Cat", "Frog", "Fox", "Lion", "Eagle", "Tiger", "Wolf"]
const getNameButton = document.getElementById("getName");
document.getElementById("newSpiritbtn").disabled = true;
let hoverTest = document.getElementsByTagName("button");
// getNameButton.addEventListener('click', function () {
//     const getnamein = document.getElementById("fname").value;
//     console.log(getnamein.length);
//     if (getnamein.length !== 0) {
//         const randomAnimalIndex = Math.floor(Math.random() * spiritAnimal.length);
//         const result = `${getnamein} - ${spiritAnimal[randomAnimalIndex]} `;
//         document.getElementById("spiritnameout").value = result;
//         return console.log(result);
//     } else {
//         console.log("nothing");
//     }
// })

//New spirit animal ********************************************************************************************************************************

const newSpiritAnimal = document.getElementById("newSpiritbtn");
newSpiritAnimal.addEventListener('click', function (newSpiritf) {
    const getnamein = document.getElementById("fname").value;
    if (getnamein.length !== 0) {
        const randomAnimalIndex = Math.floor(Math.random() * spiritAnimal.length);
        const result = `${getnamein} - ${spiritAnimal[randomAnimalIndex]} `;
        document.getElementById("spiritnameout").value = result;
    } else alert("Please enter your name")
})

//Event types - Optional and a little tricky ********************************************************************************************************************************

//&& getNameButton.click
document.getElementById("getName").disabled = true;
function myFunction() {
    if (buttoncheck.checked) {
        document.getElementById("getName").disabled = false;
        getNameButton.addEventListener('click', function () {
            const getnamein = document.getElementById("fname").value;
            if (getnamein.length !== 0) {
                const randomAnimalIndex = Math.floor(Math.random() * spiritAnimal.length);
                const result = `${getnamein} - ${spiritAnimal[randomAnimalIndex]} `;
                document.getElementById("spiritnameout").value = result;
                return console.log(result);
            } else {
                console.log("nothing");
                alert("Please enter your name")
            }
        })
    } else document.getElementById("getName").disabled = true;
}
function hoverCheckBoxFunction() {
    if (hovercheck.checked) {
        document.getElementById("newSpiritbtn").disabled = false;

    } else document.getElementById("newSpiritbtn").disabled = true;
}
function mouseOutFunction(y) {
    document.getElementById("spiritnameout").value = "";
}
function spiritAnimShowFunction(x) {
    const getnamein = document.getElementById("fname").value;
    if (getnamein.length !== 0) {
        const randomAnimalIndex = Math.floor(Math.random() * spiritAnimal.length);
        const result = `${getnamein} - ${spiritAnimal[randomAnimalIndex]} `;
        document.getElementById("spiritnameout").value = result;
    } else {
        console.log("nothing");
        alert("Please enter your name")
    }
}

//hyfBay - get the okay'est products here ********************************************************************************************************************************

const products = [{
    name: "Blue Zara T-shirt",
    color: "Blue",
    price: 200,
    category: "Women"

},
{
    name: "Red Zara Pants",
    color: "Red",
    price: 300,
    category: "Women"

},
{
    name: "Black Zara Pants",
    color: "Black",
    price: 350,
    category: "Men"

},
]
const searchingButton = document.getElementById('searchingbutton');
searchingButton.addEventListener('click', function () {
    const searchItemName = document.getElementById('searchbox').value;
    for (key in products) {
        let productNameArr = products[key].name.toLowerCase().split(" ")
        for (let i = 0; i < productNameArr.length; i++) {
            if (productNameArr[i] == searchItemName.toLowerCase()) {// I could use the includes method also then the products thet their names was included the serached string would be displayed.
                const newDiv = document.createElement("div");
                document.body.appendChild(newDiv);
                const newOutPut = document.createElement('output');
                newDiv.appendChild(newOutPut);
                newOutPut.value = `${products[key].name} ${products[key].price} ${products[key].category}`;
            }
        }

    }
})
const checkboxInput = document.getElementById("checkcboxcolor");
const checkBoxBlue = document.getElementById("checkcboxcolor1");
const checkBoxRed = document.getElementById("checkcboxcolor2");
const checkBoxBlack = document.getElementById("checkcboxcolor3");
function filtercolor(color) {
    // I checked different conditions to make sure the group filtered products would be shown 
    //despite the correct result I am sure it is not a logical way to display group filters
    // There are alot I want to learn
    //1- how to disable multi choice of checkbox?
    // 2- how to use _.countby(str) in javascript?
    // 3- is there any way to create tags and make it easy to display group filtered products?
    //4- will studying SQL help us to find more easy  -short ways to create bunch of product?
    // 5- please introduce JS sources to become more familiar with different methods except MDN.
    if (checkBoxBlue.checked == true && checkBoxRed.checked == true && checkBoxBlack.checked == true) {
        const filterResult = products.filter(product => product.color == "Black" || product.color == "Red" || product.color == "Blue");
        let j = 0;
        for (let i = 0; i < 3; i++) {
            j = i + 1;
            const idName = "outputfilter" + j;
            console.log(idName)
            document.getElementById(idName).value = `${filterResult[i].name}  ${filterResult[i].color}  ${filterResult[i].price} ${filterResult[i].category}`;

        }


    } else if (checkBoxBlue.checked == true && checkBoxRed.checked == true) {
        const filterResult = products.filter(product => product.color == "Red" || product.color == "Blue");
        let j = 0;
        for (let i = 0; i < 2; i++) {
            j = i + 1;
            const idName = "outputfilter" + j;
            console.log(idName)
            document.getElementById(idName).value = `${filterResult[i].name}  ${filterResult[i].color}  ${filterResult[i].price} ${filterResult[i].category}`;

        }
    } else if (checkBoxBlue.checked == true && checkBoxBlack.checked == true) {
        const filterResult = products.filter(product => product.color == "Blue" || product.color == "Black");
        let j = 0;
        for (let i = 0; i < 2; i++) {
            j = i + 1;
            const idName = "outputfilter" + j;
            console.log(idName)
            document.getElementById(idName).value = `${filterResult[i].name}  ${filterResult[i].color}  ${filterResult[i].price} ${filterResult[i].category}`;

        }
    } else if (checkBoxRed.checked == true && checkBoxBlack.checked == true) {
        const filterResult = products.filter(product => product.color == "Red" || product.color == "Black");
        let j = 0;
        for (let i = 0; i < 2; i++) {
            j = i + 1;
            const idName = "outputfilter" + j;
            console.log(idName)
            document.getElementById(idName).value = `${filterResult[i].name}  ${filterResult[i].color}  ${filterResult[i].price} ${filterResult[i].category}`;

        }
    } else if (color == "blue") {
        const filterResult = products.filter(product => product.color == "Blue");
        document.getElementById("outputfilter1").value = `${filterResult[0].name}  ${filterResult[0].color}  ${filterResult[0].price} ${filterResult[0].category}`;
    } else if (color == "red") {
        const filterResult = products.filter(product => product.color == "Red");
        document.getElementById("outputfilter2").value = `${filterResult[0].name}  ${filterResult[0].color}  ${filterResult[0].price} ${filterResult[0].category}`;
    } else if (color == "black") {
        const filterResult = products.filter(product => product.color == "Black");
        document.getElementById("outputfilter3").value = `${filterResult[0].name}  ${filterResult[0].color}  ${filterResult[0].price} ${filterResult[0].category}`;
    }

}
