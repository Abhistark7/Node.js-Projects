const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value === 'password') {
                throw new Error('Password should not be password, Duh!')
            }
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

const me = new User({
    name: 'Mike',
    email: 'mike@gmail.com    ',
    password: 'kettlefry'
})

const task1 = new Task({
    description: 'Resume edit',
})

task1.save().then((result) => {
    console.log(result)
}).catch((result) => {
    console.log('Error', result)
})

// me.save().then((result) => {
//     console.log(result)
// }).catch((result) => {
//     console.log('Error', result)
// })