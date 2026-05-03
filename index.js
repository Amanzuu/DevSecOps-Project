const express = require("express");
const { randomUUID } = require("crypto");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

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

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const initialLength = tasks.length;

  tasks = tasks.filter(t => t.id !== req.params.id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Root route (optional fallback)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});