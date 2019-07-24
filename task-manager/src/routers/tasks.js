const express = require('express')
const Task = require('../models/task')
const mongoose = require('mongoose')
const router = new express.Router()

router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async(req, res) => {
    console.log('Fetching all tasks...')
    try {
        const allTasks = await Task.find({})
        res.send(allTasks)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.send(500).send()
    }
})

router.post('/saveTask', async(req, res) => {
    console.log('Saving task... ', req.body)
    const task = new Task({ completed: req.body.completed, desciption: req.body.name })
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router