const express = require("express");
const router = express.Router();

const reviews = require("../data/reviews.json");

//api/reviews
router.get("/", async (request, response) => {
  try {
    response.send(reviews);
  } catch (error) {
    throw error;
  }
});

//api/reviews/{id}
router.get("/:id", (req, res) => {
  const idNum = Number(req.params.id);
  if (isNaN(idNum)){
    res.send(400).end();
  }
  const revById = reviews.find(rev => (rev.id == req.params.id));
  if (typeof revById == 'undefined'){
    res.send(404).end();
  }
  res.send(revById);
})

module.exports = router;
