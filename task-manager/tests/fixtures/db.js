const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'reiuqhfi1!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description: 'First Task',
    completed: false,
    owner: userOne._id
}

const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Abhishek',
    email: 'abhishek@example.com',
    password: 'myhouse22',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'Second Task',
    completed: false,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId,
    description: 'Third Task',
    completed: false,
    owner: userTwo._id
}

const setupDatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    setupDatabase,
    taskThree
}