# Weekly Report Generator & Team Dashboard

A full-stack **MERN** application designed to streamline weekly team reporting. The system allows team members to submit structured weekly work reports and gives managers a consolidated, data-driven dashboard to analyze team performance, track blockers, manage projects, and gain AI-powered insights.

The application includes role-based access control, secure authentication using HTTP-only cookies, project management features, visual reporting dashboards, and an integrated AI Chat Assistant powered by **Llama 3.1 via the Groq API**.

---

## 🚀 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS v4
* React Router DOM
* Recharts
* Lucide React

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* HTTP-only cookies
* SameSite cookie protection

### AI Integration

* Groq SDK
* Llama-3.1-8b-instant model

### Security

* Helmet
* Express Rate Limit
* XSS-Clean
* HPP
* Express Mongo Sanitize
* CORS

---

## ✨ Key Features

### 🔐 Security & Architecture

* Role-Based Access Control for Team Members and Managers
* Protected frontend routes based on user roles
* Secure backend API with multiple security middlewares
* JWT authentication stored in HTTP-only cookies
* Protection against common web vulnerabilities such as XSS, NoSQL injection, parameter pollution, and brute-force attacks
* CORS configuration for secure frontend-backend communication

---

## 👤 Team Member Features

### Dedicated Dashboard

Team members have access to a personalized dashboard where they can view their previous weekly report submissions.

### Weekly Report Submission

Team members can submit structured weekly reports containing:

* Report week/date range
* Project tags
* Completed tasks
* Planned tasks
* Blockers
* Optional working hours
* Optional notes

### Data Integrity

Team members can only:

* View their own reports
* Submit reports under their own account
* Access routes allowed for the Team Member role

---

## 👑 Manager / Admin Features

### Global Team Dashboard

Managers can view a consolidated dashboard containing all team submissions.

### Visual Data Insights

Managers can analyze team activity using visual charts powered by Recharts, including:

* Workload distribution
* Task distribution
* Project-based reporting data
* Team submission activity

### Summary Metrics

The dashboard provides quick metrics such as:

* Total weekly submissions
* Estimated compliance rates
* Total open blockers
* Team activity overview

### Project Management

Managers can manage work categories and projects with full CRUD functionality.

Project management includes:

* Add new projects
* View existing projects
* Update project details
* Soft-delete inactive projects

Soft deletion is handled using an `isActive` flag to preserve historical reporting data.

---

## 🤖 AI Chat Assistant

The application includes a floating AI-powered chat widget designed for managers.

The AI Chat Assistant dynamically fetches the latest 50 team reports from the database and uses **Llama 3.1** through the **Groq API** to answer natural language questions.

Managers can ask questions such as:

* What blockers are recurring across the team?
* Which project has the highest workload?
* Summarize this week’s team progress.
* Who has reported blockers recently?
* What tasks are planned for next week?
* Which projects appear overloaded?

The assistant helps managers gain conversational insights into:

* Team activity
* Open blockers
* Workload distribution
* Project progress
* Weekly performance trends

---

## 🗄️ Database Entity Relationship

The database is structured using Mongoose schemas.

### User

Represents application users.

A user can be either:

* Team Member
* Manager/Admin

Relationship:

* One User can have many Reports

### Project

Represents work categories or projects that reports can be tagged with.

Relationship:

* One Project can have many Reports

Additional field:

* `isActive` flag for soft deletion

This ensures deleted or inactive projects do not affect historical reports.

### Report

The central collection that connects Users, Projects, and weekly reporting data.

A report stores:

* User reference
* Project reference
* Weekly dates
* Completed tasks
* Planned tasks
* Blockers
* Optional hours
* Optional notes

---

## ⚙️ Setup & Installation Instructions

Follow these steps to run the application locally.

---

## 1. Prerequisites

Make sure the following are installed on your system:

* [Node.js](https://nodejs.org/) v18 or higher
* [Git](https://git-scm.com/)
* MongoDB database

You can use either:

* Local MongoDB instance through [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
* Free cloud MongoDB cluster through [MongoDB Atlas](https://www.mongodb.com/atlas/database)

You will also need:

* A free Groq API key from the [Groq Console](https://console.groq.com/)

---

## 2. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

---

## 3. Backend Environment Setup

Navigate to the backend directory:

```bash
cd api
```

Create a `.env` file in the root of the `api` folder.

Add the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=generate_a_secure_random_string_here
GROQ_API_KEY=your_groq_api_key_here
```

### Local MongoDB Example

If you are using MongoDB locally, your `MONGO_URI` may look like this:

```env
MONGO_URI=mongodb://localhost:27017/weekly-reports
```

---

## 4. Install Backend Dependencies

Inside the `api` folder, run:

```bash
npm install
```

---

## 5. Run the Backend Server

Start the backend server in development mode:

```bash
npm run dev
```

If everything is configured correctly, you should see messages similar to:

```bash
🚀 Server running on port 5000
✅ Connected to MongoDB
```

---

## 6. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd client
```

Install frontend dependencies:

```bash
npm install
```

---

## 7. Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

Open your browser and visit the local URL shown in the terminal.

Usually, the frontend will run at:

```bash
http://localhost:5173
```

---

## 📁 Project Structure

```bash
weekly-report-generator/
│
├── api/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔑 Environment Variables

The backend requires the following environment variables:

| Variable       | Description                          |
| -------------- | ------------------------------------ |
| `PORT`         | Port number for the backend server   |
| `MONGO_URI`    | MongoDB connection string            |
| `JWT_SECRET`   | Secret key used to sign JWT tokens   |
| `GROQ_API_KEY` | API key used for Groq AI integration |

Example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/weekly-reports
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

---

## 🔐 Authentication Flow

The application uses JWT authentication with secure HTTP-only cookies.

Authentication flow:

1. User logs in with valid credentials.
2. Backend validates the user.
3. Backend generates a JWT token.
4. JWT is stored in an HTTP-only cookie.
5. Frontend requests protected resources.
6. Backend verifies the cookie token.
7. User receives access based on their role.

This approach helps protect the token from client-side JavaScript access and reduces the risk of token theft through XSS attacks.

---

## 🧑‍💼 User Roles

### Team Member

Team Members can:

* Log in securely
* Access their own dashboard
* Submit weekly reports
* View their own report history
* Tag reports with active projects
* Add blockers, completed tasks, planned tasks, hours, and notes

### Manager / Admin

Managers can:

* View all team reports
* Access global dashboard metrics
* Analyze team workload
* Track blockers
* Manage projects
* View visual charts
* Use the AI Chat Assistant
* Identify team trends and recurring issues

---

## 📊 Dashboard Insights

The Manager Dashboard provides data-driven insights such as:

* Number of weekly submissions
* Open blockers
* Workload by project
* Task distribution
* Submission compliance
* Team member activity
* Project performance
* Recent report summaries

Charts are built using **Recharts** for clear and interactive data visualization.

---

## 🧱 Backend Security Middleware

The backend uses multiple security layers:

### Helmet

Helps secure Express apps by setting various HTTP headers.

### Express Rate Limit

Protects the API from brute-force attacks and excessive requests.

### XSS-Clean

Helps sanitize user input against cross-site scripting attacks.

### HPP

Protects against HTTP parameter pollution attacks.

### Express Mongo Sanitize

Protects against MongoDB operator injection and NoSQL injection attacks.

### CORS

Controls which frontend origins can access the backend API.

---

## 🧪 Available Scripts

### Backend

Run inside the `api` directory:

```bash
npm install
npm run dev
```

### Frontend

Run inside the `client` directory:

```bash
npm install
npm run dev
```

---

## 🧠 AI Assistant Workflow

The AI Assistant works as follows:

1. Manager opens the floating AI chat widget.
2. Frontend sends the manager’s question to the backend.
3. Backend fetches the latest 50 team reports from MongoDB.
4. Backend sends relevant report data and the manager’s question to Groq.
5. Groq processes the request using the Llama-3.1-8b-instant model.
6. The assistant returns a natural language response to the manager.

---

## 📌 Example AI Questions

Managers can ask:

```text
Summarize this week's reports.
```

```text
What are the most common blockers?
```

```text
Which projects have the highest workload?
```

```text
Who submitted reports this week?
```

```text
Which team members mentioned delays?
```

```text
What should I follow up on?
```

---

## 🧾 Weekly Report Fields

Each weekly report can include:

| Field           | Description                      | Required |
| --------------- | -------------------------------- | -------- |
| Week Start Date | Start date of the reporting week | Yes      |
| Week End Date   | End date of the reporting week   | Yes      |
| Project         | Project or work category         | Yes      |
| Completed Tasks | Tasks completed during the week  | Yes      |
| Planned Tasks   | Tasks planned for the next week  | Yes      |
| Blockers        | Current blockers or issues       | Yes      |
| Hours           | Optional estimated hours worked  | No       |
| Notes           | Additional notes or comments     | No       |

---

## 🧩 Main Modules

### Authentication Module

Handles:

* User login
* User registration
* Logout
* JWT generation
* Cookie handling
* Protected route access

### Report Module

Handles:

* Weekly report creation
* Report retrieval
* User-specific reports
* Manager-level report access
* Report filtering and summaries

### Project Module

Handles:

* Project creation
* Project updates
* Project listing
* Soft deletion
* Active/inactive project management

### Dashboard Module

Handles:

* Summary metrics
* Chart data
* Team activity statistics
* Project workload data
* Blocker tracking

### AI Module

Handles:

* Groq API communication
* AI prompt generation
* Latest report fetching
* Natural language response generation

---

## ✅ Verification Checklist

After setup, verify the following:

* Backend server starts successfully
* MongoDB connection is successful
* Frontend Vite server starts successfully
* Login and authentication work correctly
* Team Members can submit reports
* Managers can view all reports
* Managers can manage projects
* Charts display dashboard data
* AI Chat Assistant responds using report data

---

## 🛠️ Troubleshooting

### Backend server does not start

Check that:

* You are inside the `api` folder
* Dependencies are installed
* `.env` file exists
* `PORT`, `MONGO_URI`, `JWT_SECRET`, and `GROQ_API_KEY` are configured correctly

### MongoDB connection fails

Check that:

* MongoDB is running locally, or
* MongoDB Atlas cluster is active
* Your MongoDB connection string is correct
* Your IP address is allowed in MongoDB Atlas Network Access settings

### Frontend does not start

Check that:

* You are inside the `client` folder
* Dependencies are installed
* Vite is installed through project dependencies
* Backend server is running if frontend API calls are required

### AI Assistant does not respond

Check that:

* `GROQ_API_KEY` is valid
* Backend server is running
* API route for AI chat is configured
* Reports exist in the database
* Groq SDK is installed in the backend

---

## 📦 Deployment Notes

Before deploying, make sure to:

* Use a production MongoDB Atlas cluster
* Use a strong `JWT_SECRET`
* Store environment variables securely
* Configure production CORS origins
* Enable HTTPS
* Set secure cookie options correctly
* Avoid exposing API keys in frontend code
* Use production build for React frontend

Build the frontend:

```bash
cd client
npm run build
```

---

## 📄 License

This project is intended for educational and internal team productivity use.

---

## 🙌 Summary

The **Weekly Report Generator & Team Dashboard** is a secure, full-stack MERN application that simplifies weekly reporting for teams. Team members can submit structured reports, while managers gain a centralized dashboard for tracking progress, workload, blockers, and project activity.

With the integrated AI Chat Assistant powered by Llama 3.1 through Groq, managers can also ask natural language questions and receive instant insights from recent team reports.
