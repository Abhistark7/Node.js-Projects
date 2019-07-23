require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove({ _id: '5d29f7ef9f94bb455eef62f9' }).then((result) => {
    console.log(result)
    return Task.countDocuments({ conpleted: false })
}).then((task) => {
    console.log(task)
}).catch((e) => {
    console.log(e)
})