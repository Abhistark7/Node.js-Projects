const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async(req, res) => {
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

router.get('/users', async(req, res) => {
    console.log('Getting users...')
    try {
        const user = await User.find({})
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/:id', async(req, res) => {
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

router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.send(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router