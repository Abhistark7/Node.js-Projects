const express = require('express')
const userRouter = require('./routers/users')
const User = require('./models/user')
const Task = require('./models/task')
require('../src/db/mongoose')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ', port)
})