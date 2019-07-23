require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// User.findByIdAndUpdate('5d29fba67d8c39475bc0ce5b', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

// updateAgeAndCount('5d29fba67d8c39475bc0ce5b', 2).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5d35b21714b5124353887a3f').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})