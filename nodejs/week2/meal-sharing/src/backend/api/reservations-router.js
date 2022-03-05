const express = require("express");
const router = express.Router();

const reservations = require("../data/reservations.json");

//api/reservations
router.get("/", async (request, response) => {
  try {
    response.send(reservations);
  } catch (error) {
    throw error;
  }
});

//api/reservations/{id}
router.get("/:id", (req, res) => {
  const idNum = Number(req.params.id);
  if(isNaN(idNum)){
    res.send(400).end();
  }
  try{
    const resById = reservations.find(res => (res.id == req.params.id));
    if (typeof resById === 'undefined') {
      res.send(404).end();
    }
    res.send(resById);
  }
  catch (err) {
    throw err;
  }
})

module.exports = router;
