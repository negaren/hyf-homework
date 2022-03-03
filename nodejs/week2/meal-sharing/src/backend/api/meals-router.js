const express = require("express");
const router = express.Router();

const meals = require("../data/meals.json");

///api/meals All meals/ maxPrice/ title/ createdAfter/ limit
router.get("/", (req, res) => {
  if ("maxPrice" in req.query) {
    const maxPriceNum = Number(req.query.maxPrice);
    if (isNaN(maxPriceNum)) {
      res.send(400).end();
    }
    else {
      const mealsByMaxPrice = meals.filter(meal => meal.price < maxPriceNum);
      res.send(mealsByMaxPrice);
    }
  }
  else if ("title" in req.query) { 
    const lowerTitle =  req.query.title.toLowerCase();
    const mealsByTitle = meals.filter(meal => (meal.title.toLowerCase().includes(lowerTitle)));
    res.send(mealsByTitle);
  }
  else if ("createdAfter" in req.query) {
    const toDateFormat = Date.parse(req.query.createdAfter);
    if (isNaN(toDateFormat)) {
      res.send(400).end();
    }
    const mealsCreatedAfter = meals.filter(meal => (new Date(meal.createdAt) > new Date(req.query.createdAfter)));
    res.send(mealsCreatedAfter);
  }
  else if ("limit" in req.query) {
    const limitNumber = Number(req.query.limit);
    if (isNaN(limitNumber)) {
      res.send(400).end();
    }
    const limitMeals = meals.slice(0, req.query.limit);
    res.send(limitMeals);
  }
  else if (Object.keys(req.query).length === 0) {
    res.send(meals);
  }
  else {
    try {
      res.send(400);
    } catch (error) {
      throw error;
    }
  }
});

//api/meals/{id}
router.get("/:id", async (request, response) => {
  const idParam = Number(request.params.id);
  if (isNaN(idParam)) {
    response.send(400).end();
  }
  else {
    try {
      const mealById = meals.find(meal => `${meal.id}` == idParam);
      console.log(typeof mealById);
      if(typeof mealById == 'undefined') {
        response.send(404);
      }
      response.send(mealById);
    }
    catch (error) {
      throw error;
    }
  }
});


module.exports = router;
