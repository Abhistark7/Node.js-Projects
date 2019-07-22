// CRUD create read update delete

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()
console.log(id.id.length)
console.log(id.getTimestamp())
console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Error connecting to mongodb!')
    }

    const db = client.db(databaseName)

    db.collection('users').updateOne({
        _id: new ObjectId('5d28aded8bd5880ba155987d')
    }, {
        $inc: {
            age: 3
        }
    }).then((result) => {
        console.log(result)
    }).catch((result) => {
        console.log(result)
    })

    db.collection('tasks').updateMany({ completed: true }, {
        $set: {
            completed: false
        }
    }).then((result) => {
        console.log(result)
    }).catch((result) => {
        console.log(result)
    })

    db.collection('tasks').deleteOne({ completed: false }).then((result) => {
        console.log('Deleted succesfully')
    }).catch((result) => {
        console.log('Cannot delete!')
    })

    const addUser = (newUser) => {
        db.collection('users').insertOne(newUser).then((result) => {
            console.log('User added ', result)
        }).catch((result) => {
            console.log('Error ', result)
        })
    }

})

module.exports = addUser