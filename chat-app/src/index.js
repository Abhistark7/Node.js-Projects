const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())

// Setup static directory
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', () => {
    console.log('New Socket connection')
})

server.listen(port, () => {
    console.log('Server is up on port ', port)
})