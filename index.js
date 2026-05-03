const express = require("express");
const { randomUUID } = require("crypto");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];

// Create task
app.post("/tasks", (req, res) => {
  const { title } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  const task = {
    id: randomUUID(),
    title,
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send("Task not found");

  task.completed = req.body.completed;
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.send("Deleted");
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
