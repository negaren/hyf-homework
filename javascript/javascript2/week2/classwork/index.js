/**
 * Get random integer between two numbers, found here: https://stackoverflow.com/a/7228322
 * @param {integer} min - The min number
 * @param {integer} max - The max number
 * @returns {Number} Random number between min and max
 */
 function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * Get an array with listing objects with random color and speed
 * @param {integer} numberOfListings - The number of listings 
 * @returns {array} Array containing the listing objects
 */
function generateListings(numberOfListings) {
    const listings = [];

    const listingType = ['House', 'Apartment', 'Shed', 'Dorm', 'Farm'];
    const listingFacilities = ['Parkering', 'Elevator', 'Altan', 'Have', 'Husdyr'];
    
    for (let i = 0; i < numberOfListings; i++) {
        const listing = {};
        const randomTypeIndex = randomIntFromInterval(0, listingType.length - 1);
        const numberOfFacilities = randomIntFromInterval(1, listingFacilities.length - 1);
        const facilities = [];
        for(let i = 0; i < numberOfFacilities; i++) {
            const randomIndexFacilities = randomIntFromInterval(0, listingFacilities.length - 1);
            const randomFacility = listingFacilities[randomIndexFacilities];
            
            if (!(facilities.includes(randomFacility))) {
                facilities.push(randomFacility);
            }
        }

        listing.type = listingType[randomTypeIndex];
        listing.facilities = facilities;
        listing.price = randomIntFromInterval(1, 10000);
        listing.hasGarden = Boolean(randomIntFromInterval(0, 1));
        listing.size = randomIntFromInterval(12, 1000);
        listing.img = `https://loremflickr.com/200/200/${listing.type}`

        listings.push(listing);
    }

    return listings;
}

generateListings(37);
console.log(generateListings(37));

generateListings(37).forEach((element) => { console.log(element.size) 
    
});
    
console.log(generateListings(37).map((listing)=> listing.price))

console.log(generateListings(37).filter(element => element.price < 3000));

console.log(generateListings(37).filter(element => element.price > 3000));

console.log(generateListings(37).filter(element => element.price > 3000).map((element) => element.price))

console.log(generateListings(37).filter(element => element.facilities.includes('Parkering')).map((listing) => listing.facilities))


// const filters = {
//     type: 'farm',
//     facilities: ['Parkering']
// }

// const filterListings = (listings, filters) => {
//    filters.forEach((key, index) => { listings.filter(key => filters.element)
// })
// }


// const listings = generateListings(50);
// const filteredListings = filterListings (listings, filters);


// Reduce excersise with Karolina

let movies = [
    { title: "hej", rating: 8 },
    { title: "bye", rating: 4 },
    { title: "ok", rating: 9 },
    { title: "byebye", rating: 9 },
  ];
  
  
  
  let moviesRatedArray = movies.map((movie) => {
    if (movie.rating > 7) {
      movie.tag = "good";
    }
    return movie;
  });
  console.log(moviesRatedArray)
  
  const goodMovies = () => {
    let array = moviesRatedArray.reduce(function (sum, movie) {
      if (movie.tag === "good") {
        return sum + 1;
      } else return sum;
    }, 0);
    console.log(array);
    return array;
  };
  
  goodMovies();
  
  const badMovies = () => {
    return moviesRatedArray.reduce(function (sum, movie) {
      if (movie.tag === "bad") {
        return sum + 1;
      } else sum;
    }, 0);
  };
  
  let words = "hej hej how are you?";
  let arrayWords = words.split(" ");
  console.log(arrayWords);
  