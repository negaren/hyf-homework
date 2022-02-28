const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("nodejs week2 homework"));

app.get("/numbers/add", (req, res) => {
    const firstNum = Number(req.query.first);
    const secondNum = Number(req.query.second);
    res.send(`${firstNum + secondNum}`);
})

app.get("/numbers/multiply", (req, res) => {
    res.send(`${Number(req.query.first) * Number(req.query.second)}`);
})

app.listen(3000, () => console.log(`Calculator:listening on port 3000`));
