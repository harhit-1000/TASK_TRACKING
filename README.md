# 📝 Task Tracker App

A full-featured Task Tracking web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), featuring authentication and CRUD operations. Each user can register, log in, and manage their personal tasks with due dates, priorities, and status.

🚀 **Live Site**: [Task Tracker](https://task-tracking-uwlh.vercel.app/)

---

## ✨ Features

- 🔐 User Authentication (Register/Login) using JWT and bcrypt
- ✅ Create, Read, Update, Delete (CRUD) tasks
- 📅 Set Due Date, Priority (Low/Medium/High), and Status (Pending/Completed)
- 🔄 Real-time updates (after actions like add/delete/update)
- 📁 Separate frontend and backend deployments (Vercel + Render)
- 🧾 Environment-based configuration for secure deployment

---

## 🛠 Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Deployment**:
  - Frontend: [Vercel](task-tracking-uwlh.vercel.app)
  - Backend: [Vercel](task-tracking-delta.vercel.app)

---

## 📦 Folder Structure
project-root/
│
├── backend/ # Express server
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/ # React application
│ ├── src/
│ ├── public/
│ └── vite.config.js


## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://task-tracking-uwlh.vercel.app

Frontend .env
env
Copy
Edit
VITE_API_BASE_URL=task-tracking-delta.vercel.app

🧪 API Endpoints
Auth Routes
POST /api/auth/register – Register new user

POST /api/auth/login – Login user

Task Routes (Protected)
GET /api/tasks – Get user’s tasks

POST /api/tasks – Create task

PUT /api/tasks/:id – Update task

DELETE /api/tasks/:id – Delete task

💡 Usage Instructions

1. Clone Repo
bash
Copy
Edit
git clone https://github.com/your-username/task-tracker-app.git

2. Set up Backend
bash
Copy
Edit
cd backend
npm install
npm run dev

3. Set up Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev


🧑‍💻 Author
Harshit Kumar
B.Tech in CSE (AI & ML), Technocrats Institute of Technology
MERN Developer

