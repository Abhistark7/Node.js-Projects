const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create a new user
router.post('/users', async(req, res) => {
    console.log('Saving... ', req.body)
    const user = new User({ name: req.body.name, age: req.body.age, email: req.body.email, password: req.body.password })
    try {
        const token = await user.generateAuthToken()
        res.send({ token, user })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// Login user by email and password
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ token, user })
    } catch (e) {
        res.status(404).send(e)
    }
})


// Logout user with a unique token
router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Logout user from all devices
router.post('/users/logoutAllDevices', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Get user profile
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// Update user profile
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a user
router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router