// server.js
// Entry point of the app — sets up Express, middleware, and routes.

const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies (req.body)
app.use(express.json());

// Basic root route — just so hitting "/" doesn't 404 confusingly
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Task Manager API is running. Try /api/tasks' });
});

// Mount all task routes under /api/tasks
app.use('/api/tasks', tasksRouter);

// Catch-all 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Basic error-handling middleware — catches anything that throws
// (e.g. malformed JSON body) instead of crashing the server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({ error: 'Something went wrong. Check your request.' });
});

app.listen(PORT, () => {
  console.log(`Task Manager API running at http://localhost:${PORT}`);
});
