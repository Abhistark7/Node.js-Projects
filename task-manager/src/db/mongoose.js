const mongoose = require('mongoose')
const User = require('../models/user')
const Task = require('../models/task')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const addNewUser = (user, callback) => {
    const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password
    })
    newUser.save().then((result) => {
        callback('User added successfully! ', result)
    }).catch((result) => {
        callback('Eroor occurred!', result)
    })
}

const addNewTask = (task) => {
    return new Promise((res, rej) => {
        const newTask = new Task({
            description: task.name,
            completed: task.isCompleted
        })
        newTask.save().then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    })
}

module.exports = {
    addNewUser: addNewUser,
    addNewTask: addNewTask
}