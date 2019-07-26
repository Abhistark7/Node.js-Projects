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


const main = async() => {
    // const task = await Task.findById('5d3a7932a368bd0f2d899b14')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5d3a76f8060bb0097e6368c0')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()