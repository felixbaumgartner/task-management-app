const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET all tasks
router.get('/', taskController.getAllTasks);

// GET a single task by ID
router.get('/:id', taskController.getTaskById);

// POST a new task
router.post('/', taskController.createTask);

// PUT (update) an existing task
router.put('/:id', taskController.updateTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;