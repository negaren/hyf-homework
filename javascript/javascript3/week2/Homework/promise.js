// Promise that resolves after set time

function asyncFunction(resolveAfter) {
    const promiseOne = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done');
        }, (resolveAfter * 1000))
    })
    return promiseOne;
}
asyncFunction(3).then(() => {
    console.log("I am called asynchronously");
})

// async/await

function asyncFunctionOne(resolveAfter) {
    const promiseOne = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('I am called asynchronously');
        }, (resolveAfter * 1000))
    })
    return promiseOne;
}

async function asyncFunctionTwo() {
    const result = await asyncFunctionOne(4);
    console.log(result);
}
asyncFunctionTwo();

//Rewrite time

function setTimeoutPromise(seconds) {
    const promiseTimeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolved');
        }, seconds)
    })
    return promiseTimeout;
}
console.log(typeof setTimeoutPromise(3000));
setTimeoutPromise(3000).then(() => {
    console.log("Called after 3 seconds");
});


function getCurrentLocation() {
    const promiseGeoLocation = new Promise((resolve, reject) => {
        function error(err) {
            reject(err.message)
        }
        function success(pos) {
            resolve(pos)
        }
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(success, error)
        }, 5000)
    })
    return promiseGeoLocation;
}
getCurrentLocation()
    .then((position) => {
        // called when the users position is found
        console.log(position);
    })
    .catch((error) => {
        // called if there was an error getting the users location
        console.warn(error);
    });

//Fetching and waiting
let movieArr = [];
const url = 'https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json';
setTimeout(() => {
    const movieApi = fetch(url);
    movieApi
        .then(response => response.json())
        .then(data => {
            for (value of data) {
                movieArr.push(value.title);
            }
            console.log(movieArr);
        })
        .catch(error => console.warn(error))
}, 3000)

//Do the 3 steps below using async/await

let movieArr1 = [];
async function promiseFetchFunction() {
    try {
        const responseFetch = await fetch(url);
        const jsonFetch = await responseFetch.json();
        return jsonFetch;
    } catch (error) {
        console.warn(error);
    }

}


setTimeout(() => {
    promiseFetchFunction().then(data => {
        for (value of data) {
            movieArr1.push(value.title);
        }
        console.log(movieArr);
    })
}, 3000)

