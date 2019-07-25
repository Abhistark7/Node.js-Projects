const express = require('express')
const userRouter = require('./routers/users')
require('../src/db/mongoose')
const taskRouter = require('./routers/tasks')


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled!')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Service is temporarily down!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ', port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async() => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '24 hours' })
//     console.log(token)

//     const verify = jwt.verify(token, 'thisismynewcourse')
//     console.log(verify)
// }

// myFunction()