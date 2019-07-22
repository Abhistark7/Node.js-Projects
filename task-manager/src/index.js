const express = require('express')
const mongoose = require('./db/mongoose.js')

const app = express()
const port = process.env.PORT || 3000

// used to parse incoming request to json
app.use(express.json())

app.post('/users', (req, res) => {
    console.log('Saving... ', req.body)
    mongoose.addNewUser(req.body)
})

app.post('/saveTask', (req, res) => {
    console.log('Saving task... ', req.body)
    mongoose.addNewTask(req.body).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ', port)
})