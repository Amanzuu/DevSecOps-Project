# 🚀 DevSecOps Project - Task Manager API

## 📌 Features
- REST API (CRUD operations)
- Dockerized application
- Ready for CI/CD & Kubernetes deployment

## 🛠️ Tech Stack
- Node.js
- Express.js
- Docker

## 🐳 Docker Usage

### Build Image
docker build -t devsecops-app .

### Run Container
docker run -p 3000:3000 devsecops-app

## 🔗 API Endpoints
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## ▶️ Run Locally
npm install
node index.js