const express = require("express");
const app = express();

const mealsRouter = require("./api/meals-router");
const reservationsRouter = require("./api/reservations-router");
const reviewsRouter = require("./api/reviews-router");

// This is where you want to create your is chrome browser middleware (second exercise)


// app.use binds middleware to your application. You can give app.use a path and router. The mini router will take care of all requests with the path
app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/reviews", reviewsRouter);

app.get("/middleware-test", async (request, response) => {
    response.send({ data: 
        { "isChromeBrowser": request.isChromeBrowser }
    });
});

module.exports = app;

