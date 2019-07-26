const express = require('express')
const Task = require('../models/task')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create a new task
router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all tasks
// GET /tasks?completed=true
// GET /tasks?limit=5?size=2
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async(req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    const completed = req.query.completed
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(404).send()
    }
})

// Get task by id
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.send(500).send()
    }
})

// Update a task by id
router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a task by id
router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router