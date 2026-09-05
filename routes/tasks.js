

const express = require('express');
const router = express.Router();
const { readTasks, writeTasks } = require('../utils/storage');

.
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}


// GET /api/tasks — get all tasks
router.get('/', (req, res) => {
  const tasks = readTasks();
  res.status(200).json(tasks);
});

// GET /api/tasks/:id — get a single task by id
router.get('/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(task);
});

// POST /api/tasks — create a new task
router.post('/', (req, res) => {
  const { title, completed } = req.body;

  // Validation: title is required and must be a non-empty string
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  const tasks = readTasks();

  const newTask = {
    id: generateId(),
    title: title.trim(),
    completed: typeof completed === 'boolean' ? completed : false,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// PUT /api/tasks/:id — update an existing task
router.put('/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;

  // Validation: if title is provided, it must be a non-empty string
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }

  // Validation: if completed is provided, it must be a boolean
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be true or false' });
  }

  const updatedTask = {
    ...tasks[index],
    ...(title !== undefined && { title: title.trim() }),
    ...(completed !== undefined && { completed }),
  };

  tasks[index] = updatedTask;
  writeTasks(tasks);

  res.status(200).json(updatedTask);
});

// DELETE /api/tasks/:id — delete a task
router.delete('/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const [deletedTask] = tasks.splice(index, 1);
  writeTasks(tasks);

  res.status(200).json({ message: 'Task deleted', task: deletedTask });
});

module.exports = router;
