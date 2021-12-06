let arr = [1, 2, 3, 4, 5];
arr.push(9);
console.log(arr);
arr.unshift(10);
console.log(arr);
console.log(arr.length);
arr.shift();
console.log(arr);
arr.pop();
console.log(arr);
console.log(arr.length);
for (let j = 0; j < 5; j++) {
    console.log(arr[j]);
}

for (const element of arr) {
    console.log(element);
}
console.log(arr.toString());
console.log(arr.join(';'));
console.log(arr.includes(10));
console.log(arr.includes(1));

//object--------------------------------------
let str = '';
for (const myNum of arr) {
    str = str + myNum.toString() + ';';
}
console.log('alternative join: ', str);
const myClassMates = [{
    name: 'Vahab',
    age: 30,
}, {
    name: 'Asma',
    age: 40,
}
    , ''
]
console.log(myClassMates.length);
console.log(myClassMates[0].name);

//obj------------------------------------------
const myClassMates2 = [{
    fName: 'Qais',
    Age: 15,
    nationality: 'Jordan',
    politician: true,
},
{
    fName: 'Vahab',
    Age: 10,
    nationality: 'India',
    politician: true,
},
{
    fName: 'Vahab',
    Age: 20,
    nationality: 'Iranian',
    politician: false,
},
]
var result = myClassMates2.filter(obj => {
    return obj.fName === 'Vahab' || obj.fName === 'Qais'
})
console.log(result)

//alternative way
for (index1 in myClassMates2) {
    if (index1.fName == 'Vahab') {
        console.log("True")
        break
    }
}

var result = myClassMates2.filter(obj => {
    return obj.fName === 'Ali'
})
console.log(result)
//Teacher preffrance 

for (const mentor of myClassMates2) {
    if (mentor.fName == "Vahab") {
        console.log('Ali is in the class')
    }
}
//<exercise 1>--------------------------------------------
const cat = {
    name: 'Bertie',
    breed: 'Cymric',
    color: 'white',
    greeting: function () {
        console.log('Meow!');
    }
}
console.log(`${cat.name}`);
const catName = cat.name;
console.log(catName);
cat.greeting();
cat.color = 'black';
console.log(cat.color);
//<exercise 1>--------------------------------------------

const band = {
    name: 'Scorpions',
    nationality: 'German',
    genre: 'rock',
    members: 5,
    formed: 1965,
    split: false,
    albums: [{
        name: 'Animal Magnetism',
        released: 1980,
    },
    {
        name: 'blackout',
        released: 1982,
    },
    {
        name: 'Savage Amusement',
        released: 1988,
    }],
    present: function(){
        console.log(bandInfo);}

}
const bandInfo = `My favorite ${band.genre} music band is ${band.name}, it is a ${band.genre} band containing ${band.members} members and I love their ${band.albums[0].name} album.`;
band.present();


