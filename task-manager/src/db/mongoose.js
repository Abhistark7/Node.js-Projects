const mongoose = require('mongoose')
const User = require('./models/user')
const Task = require('./models/task')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const me = new User({
//     name: 'Mike',
//     email: 'mike@gmail.com    ',
//     password: 'kettlefry'
// })

// const task1 = new Task({
//     description: 'Resume edit',
// })

// task1.save().then((result) => {
//     console.log(result)
// }).catch((result) => {
//     console.log('Error', result)
// })

// me.save().then((result) => {
//     console.log(result)
// }).catch((result) => {
//     console.log('Error', result)
// })

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

module.exports = {
    addNewUser: addNewUser
}