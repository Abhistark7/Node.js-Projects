const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())

// Setup static directory
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('Server is up on port ', port)
})