---

# Task Management System

## Overview

The Task Management System is a full-stack web application built to help individuals and small teams organize, track, and manage their daily work efficiently. The platform offers secure authentication and an intuitive interface for handling both personal and collaborative tasks.

Users can create, update, prioritize, and monitor tasks using clear status indicators and due dates. A dedicated dashboard provides meaningful insights into task progress and productivity trends. The application is designed with simplicity, scalability, and real-world usability in mind.

---

## Tech Stack

### Frontend

* React.js (Vite)
* JavaScript (ES6+)
* Tailwind CSS
* React Router DOM
* Axios
* Context API for authentication state management

### Backend

* Node.js
* Express.js
* JWT-based authentication
* MongoDB Atlas
* Mongoose ODM

### Database

* MongoDB Atlas (cloud-hosted NoSQL database)

---

## Features Implemented

### Authentication

* User registration and login
* JWT-based authentication
* Protected routes
* Google OAuth login (bonus feature)
* Secure logout functionality

### Task Management

* Full CRUD operations for tasks
* Clear separation between personal and team-based tasks
* Task categorization using tags
* Priority levels: High, Medium, Low
* Task status tracking: Pending, In Progress, Completed
* Due date support
* Permission-based task access control

### Dashboard

* Task statistics for personal and team tasks
* Completed vs pending task insights
* Visual charts showing task completion trends
* Team overview section
* Planned (Today’s Tasks) view for daily task tracking

### Filters & Search

* Search tasks by title and description
* Filter tasks by:

  * Status
  * Priority
  * Category
* Filters supported for both personal and team task views

### UI / UX

* Fully responsive design
* Clean, modern interface inspired by Figma-style layouts
* Loading states and error handling
* Sidebar-based navigation
* Calendar-based task planning interface

---

## Setup Instructions

### Backend Setup

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file and configure:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server

   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. Navigate to the frontend directory

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

---

## API Documentation

The backend exposes RESTful APIs for authentication, task management, team management, and dashboard analytics.

Swagger (OpenAPI) documentation is available for exploring and testing all API endpoints.

---

## Database Schema

### User

* name
* email
* password
* timestamps

### Task

* title
* description
* category
* priority
* status
* dueDate
* type (PERSONAL / TEAM)
* owner
* assignedTo
* teamId
* createdBy
* timestamps

### Team

* name
* owner
* members
* timestamps

---

## Challenges and Solutions

### Challenge 1: Handling Personal vs Team Tasks

**Problem:**
Ensuring correct access control and visibility for tasks belonging to individuals versus teams.

**Solution:**
Introduced task types (`PERSONAL` and `TEAM`) along with permission checks based on ownership, team membership, and assignment rules.

---

### Challenge 2: Dashboard Analytics and Visualization

**Problem:**
Presenting meaningful productivity insights over time.

**Solution:**
Used task timestamps and aggregation logic to generate chart-ready data for completed tasks across the last 10–15 days, enabling clear visual trends on the dashboard.

---

## Future Enhancements

* Forgot password functionality
* Backend-level search and pagination
* Role-based access control
* Notifications and reminders
* Deeper Google Calendar synchronization

---

## Demo Credentials

The following demo account can be used to explore the application:

**Email:** `testingmail@test.com`
**Password:** `CRxa])N6>7kgh'k`

Alternatively, users may sign in using Google OAuth.

> Note: This demo account is provided for evaluation purposes only.

---

## Live Demo & Deployment

* **Backend:** [https://task-manager-fullstack-88dz.onrender.com](https://task-manager-fullstack-88dz.onrender.com)
* **Frontend:** [https://task-manager-fullstack-beta.vercel.app](https://task-manager-fullstack-beta.vercel.app)
* **Swagger:** [https://task-manager-fullstack-88dz.onrender.com/api-docs](https://task-manager-fullstack-88dz.onrender.com/api-docs)
* **Database:** MongoDB Atlas

---

## Video Demo

A short (2–3 minute) walkthrough demonstrating:

* Authentication flow
* Task CRUD operations
* Dashboard analytics
* Search and filtering
* Team and planned task workflows

---

## Conclusion

This project demonstrates full-stack development skills across frontend and backend integration, secure authentication, database modeling, RESTful API design, and modern UI/UX practices. It reflects real-world task management workflows while maintaining clean architecture and scalability.

---
