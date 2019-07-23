const express = require('express')
const mongoose = require('./db/mongoose.js')
const User = require('./models/user')
const Task = require('./models/task')
    // const router = express.Router()

const app = express()
const port = process.env.PORT || 3000

// const swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('./swagger.json');

// used to parse incoming request to json
app.use(express.json())

app.post('/users', async(req, res) => {
    console.log('Saving... ', req.body)
    const user = new User({ name: req.body.name, age: req.body.age, email: req.body.email, password: req.body.password })
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

app.get('/users', async(req, res) => {
    console.log('Getting users...')
    try {
        const user = await User.find({})
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send()
    }
})

app.get('/users/:id', async(req, res) => {
    console.log(req.params)
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/users/:id', async(req, res) => {
    try {

    } catch (e) {

    }
})

app.get('/tasks', async(req, res) => {
    console.log('Fetching all tasks...')
    try {
        const allTasks = await Task.find({})
        res.send(allTasks)
    } catch (e) {
        res.status(404).send()
    }
})

app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.send(500).send()
    }
})

app.post('/saveTask', async(req, res) => {
    console.log('Saving task... ', req.body)
    const task = new Task({ completed: req.body.completed, desciption: req.body.name })
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);

app.listen(port, () => {
    console.log('Server is up on port ', port)
})