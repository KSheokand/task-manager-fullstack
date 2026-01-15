

---

# Task Management System

## Overview

The Task Management System is a full-stack web application designed to help individuals and small teams efficiently organize, track, and manage their daily tasks. The platform provides a secure authentication system and a clean, intuitive interface for managing personal and team-based tasks.

Users can create, update, prioritize, and track tasks with due dates and status indicators, while gaining insights through a dashboard that visualizes task progress and productivity trends. The application emphasizes usability, scalability, and real-world workflow management.

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
* Google OAuth login (Bonus feature)
* Secure logout functionality

### Task Management

* Full CRUD operations for tasks
* Separation of Personal and Team-based tasks
* Task categorization using tags
* Priority levels: High, Medium, Low
* Task status tracking: Pending, In Progress, Completed
* Due date support
* Permission-based task access control

### Dashboard

* Task statistics for both personal and team tasks
* Completed vs pending task insights
* Visual charts displaying task completion trends
* Team overview section
* Planned (Today’s Tasks) view for daily productivity

### Filters & Search

* Search tasks by title and description
* Filter tasks by:

  * Status
  * Priority
  * Category
* Filters available for both Personal and Team task views

### UI/UX

* Fully responsive design
* Clean, modern UI inspired by Figma-style layouts
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

3. Create a `.env` file and configure the following variables:

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

Swagger / OpenAPI documentation can be integrated to visualize and test API endpoints.
(Recommended for production and API testing.)

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

### Challenge 1: Managing Personal vs Team Tasks

**Problem:**
Ensuring proper access control and visibility for personal and team-based tasks.

**Solution:**
Implemented task types (`PERSONAL` and `TEAM`) along with permission checks based on task ownership, team membership, and assigned users.

---

### Challenge 2: Dashboard Analytics & Visualization

**Problem:**
Displaying meaningful productivity insights over time.

**Solution:**
Used MongoDB timestamps and aggregation logic to generate chart-ready data for completed tasks over the last 10–15 days, enabling clear visual trends.

---

## Future Enhancements

* Forgot password functionality
* Backend-level search and pagination
* Role-based access control
* Notifications and reminders
* Advanced Google Calendar synchronization

---

## Demo Credentials

You can use the following demo account to explore the application:

**Email:** testingmail@test.com 
**Password:** CRxa])N6>7kgh'k

Alternatively, you may sign in using Google OAuth.

---

## Live Demo & Deployment

* **Backend:** https://task-manager-fullstack-88dz.onrender.com
* **Frontend:** https://task-manager-fullstack-beta.vercel.app/
* **Swagger:** https://task-manager-fullstack-88dz.onrender.com/api-docs
* **Database:** MongoDB Atlas

---

## Video Demo

A 2–3 minute walkthrough demonstrating:

* Authentication flow
* Task CRUD operations
* Dashboard analytics
* Search and filtering
* Team tasks and planned tasks workflow

---

## Conclusion

This project demonstrates full-stack development expertise, including frontend-backend integration, secure authentication, database modeling, RESTful API design, and modern UI/UX practices. It is built to reflect real-world task management workflows while maintaining scalability and clean code architecture.

---

