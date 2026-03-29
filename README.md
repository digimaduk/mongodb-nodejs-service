<!-- Node.js + Express + MongoDB + Docker + Render Deployment -->

🚀 Overview
This project is a simple Node.js + Express API connected to MongoDB Atlas, containerized using Docker, and deployable to Render. It includes:
- Express server
- Mongoose models
- REST APIs (GET, POST)
- Dockerfile for containerization
- MongoDB Atlas cloud database
- Render deployment setup

📂 Project Structure
.
├── server.js
├── db.js
├── models/
│   └── User.js
├── package.json
├── Dockerfile
└── .env (local only)

🍃 1. Setting Up MongoDB Atlas

- Go to https://www.mongodb.com/atlas
- Create a Free Shared Cluster (M0)
- Create a Database User (username + password)
- Go to Network Access → Add IP Address
- Add: 0.0.0.0/0
- Go to Database → Connect → Drivers
- Copy the connection string:

mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mydb
Use this in your .env and Render environment variables.

🛠️ 2. Local Development Setup

Install dependencies
npm install

Environment variables
Create a .env file
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mydb
PORT=3000

Run locally without Docker
node server.js

You should see:
Express Server running on 3000
MongoDB connected

🐳 3. Running Locally with Docker

Build the Docker image
docker build -t node-api .

Run the container
docker run -p 3000:3000 --env-file .env node-api

Test the API
Open in browser or Insomnia:
GET http://localhost:3000/
GET http://localhost:3000/api/users
POST http://localhost:3000/api/users

🌐 4. Deploying to Render

Step 1 — Create a Web Service
- Go to https://dashboard.render.com
- Click New → Web Service
- Connect your GitHub repo
- Choose:
- Environment: Docker
- Build Command: (Render auto-detects Dockerfile)
- Start Command: (Render auto-detects)

Step 2 — Add Environment Variables
Go to Render → Your Service → Environment
Add:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mydb
PORT=3000

Step 3 — Deploy
Click Deploy.

Step 4 — Verify Logs
You should see:

Express Server running on 3000
MongoDB connected

🐳 Bonus: Running the Project Locally with Docker Compose

If you prefer running both the API and MongoDB locally using Docker Compose, you can use the following setup. This creates:
- A Node.js API container
- A MongoDB container
- A shared Docker network
- Automatic linking so the API can reach MongoDB using the hostname mongo

Environment variables
📄 Create a .env file
MONGO_URI=mongodb://mongo:27017/mydb
PORT=3000

📄 docker-compose.yml
Create a file named docker-compose.yml in the project root.

▶️ Start the services
docker compose up --build

This will:
- Build the Node.js API image
- Start MongoDB
- Start the API and connect it to MongoDB automatically
You should see logs like:

Express Server running on 3000
MongoDB connected

