const express = require("express");
const app = express();

// import data here
const meals = require("./data/meals.json");
const reviews = require("./data/reviews.json"); 
const reservations = require("./data/reservations.json"); 

//meals
const mealsWithReviews = meals.map(meal => {
  const mealRev = reviews.filter(review => review.mealId == meal.id);
  return Object.assign(meal,({"reviews" : mealRev}));
});
//cheap-meals
let totalStars = 0;
let avgstar = 0;
const cheapMeals = mealsWithReviews.filter(mealselem => {
  mealselem.reviews.forEach(elem => {
      totalStars += elem.numberOfStars;
  })
  avgstar = totalStars / mealselem.reviews.length;
  totalStars = 0;
  return (avgstar < 4)
})
//large-meals
const largeMeals = mealsWithReviews.filter(meal => meal.maxNumberOfGuests > 5);
//meal
function randomMeal() {
  const indexNumber = Math.floor(Math.random() * mealsWithReviews.length);
  return mealsWithReviews[indexNumber];
}
//randon reservation
//function randomReservation(){
  const indexNumber = Math.floor(Math.random() * reservations.length);
  const randomReservation = reservations[indexNumber];
//}


// this is where you will be adding your routes
app.get("/", async (request, response) => {
  response.send("Meal Sharing Web App");
});
app.get("/meals", async (request, response) => {
  response.send(mealsWithReviews);
});
app.get("/cheap-meals", async (request, response) => {
  response.send(cheapMeals);
});
app.get("/large-meals", async (request, response) => {
  response.send(largeMeals);
});
app.get("/meal", async (request, response) => {
  response.send(randomMeal());
});
app.get("/reservations", async (request, response) => {
  response.send(reservations);
});
app.get("/reservation", async (request, response) => {
  response.send(randomReservation);
});

module.exports = app;
