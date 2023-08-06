
const express = require('express');
const Calculator = require('./Calculator');
const app = express()
const port = 3000

app.get('/calculate', (req, res) => {
    const expression = req.query.expression;
    let calc = new Calculator()
    let result = calc.calculate(expression)
  res.send(`Result : ${calc.result}`)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


