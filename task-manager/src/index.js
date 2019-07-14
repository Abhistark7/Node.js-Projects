const express = require('express')
const mongoose = require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

// used to parse incoming request to json
app.use(express.json())

app.post('/users', (req, res) => {
    console.log('Saving... ', req.body)
    mongoose.addNewUser(req.body)
})

app.get('', (req, res) => {
    res.send('Its working...')
})

app.listen(port, () => {
    console.log('Server is up on port ', port)
})