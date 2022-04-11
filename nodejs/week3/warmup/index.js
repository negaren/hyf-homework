const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => res.send("nodejs week3 homework"));

app.get("/calculator/multiply", (req, res) => {
    const firstNum = Number(req.query.firstParam);
    if (Array.isArray(req.query.secondParam)) {
        const secondArrMultipled = req.query.secondParam.reduce((previous, current) => {
            const pre = Number(previous);
            const curr = Number(current);
            return pre * curr;
        })
        const result = secondArrMultipled * firstNum;
        res.send(`${result}`);
    }
    else {
        const secondNum = Number(req.query.secondParam);
        const result = secondNum * firstNum;
        res.send(`${result}`);
    }
});

app.get("/calculator/add", (req, res) => {
    const firstNum = Number(req.query.firstParam);
    if (Array.isArray(req.query.secondParam)) {
        const secondArrMultipled = req.query.secondParam.reduce((previous, current) => {
            const pre = Number(previous);
            const curr = Number(current);
            return pre + curr
        })
        const result = secondArrMultipled + firstNum;
        res.send(`${result}`);
    }
    else {
        const secondNum = Number(req.query.secondParam);
        const result = secondNum + firstNum;
        res.send(`${result}`);
    }
});

app.get("/calculator/Subtraction", (req, res) => {
    const firstNum = req.query.firstParam;
    if (Array.isArray(req.query.secondParam)) {
        const newSecondArr = req.query.secondParam;
        newSecondArr.splice(0, 0, firstNum);
        const result = newSecondArr.reduce((previous, current) => {
            const pre = Number(previous);
            const curr = Number(current);
            return pre - curr;
        })
        res.send(`${result}`);
    }
    else {
        const secondNum = Number(req.query.secondParam);
        const result = firstNum - secondNum;
        res.send(`${result}`);
    }
});

app.get("/calculator/Division", (req, res) => {
    const firstNum = Number(req.query.firstParam);
    if (Array.isArray(req.query.secondParam)) {
        const newSecondArr = req.query.secondParam;
        newSecondArr.splice(0, 0, firstNum);
        const result = newSecondArr.reduce((previous, current) => {
            const pre = Number(previous);
            const curr = Number(current);
            return pre / curr;
        })
        res.send(`${result}`);
    }
    else {
        const secondNum = Number(req.query.secondParam);
        const result = firstNum / secondNum;
        res.send(`${result}`);
    }
});

app.post("/calculator/multiply", (req, res) => {
    res.send(`${Number(req.body.firstParam) * Number(req.body.secondParam)}`)
})

app.post("/calculator/devision", (req, res) => {
    res.send(`${Number(req.body.firstParam) / Number(req.body.secondParam)}`)
})

app.listen(3000, () => console.log(`Calculator:listening on port 3000`));
