# TaskFlow

TaskFlow is a full-stack MERN Todo application with JWT Authentication, task management, priorities, filters, due dates, and a responsive dashboard UI.

---

## Features

- User Signup and Login
- JWT Authentication
- Protected Routes
- Add Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Complete or Pending
- Task Priority Levels
- Due Dates
- Task Categories
- Search Tasks
- Filter by Status and Priority
- Dashboard Statistics
- User Profile Section
- Responsive Dark UI

---

## Tech Stack

### Frontend
- React.js
- CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv

---

## Run Locally

## Backend Setup

Open terminal:

```bash
cd Backend
npm install
npm run dev
```

If `npm run dev` does not work:

```bash
node server.js
```

Create a `.env` file inside Backend folder and add:

```env
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

## Live Demo

Frontend: https://task-flow-two-jet.vercel.app  
Backend API: https://taskflow-backend-js12.onrender.com



## Local Development URLs

Frontend will run on:

```txt
http://localhost:3000
```

Backend will run on:

```txt
http://localhost:5000
```