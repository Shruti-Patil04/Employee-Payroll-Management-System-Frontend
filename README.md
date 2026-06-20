# 🎨 Employee Payroll Management System - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=for-the-badge\&logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?style=for-the-badge\&logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blueviolet?style=for-the-badge\&logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-API%20Client-blue?style=for-the-badge)

*A modern and responsive user interface for the Employee Payroll Management System*

</div>

---

# 📋 Table of Contents

* Features
* Architecture
* Tech Stack
* Screenshots
* Installation
* Project Structure
* Authentication
* Deployment
* Performance
* Future Enhancements

---

# 📖 Overview

The Employee Payroll Management System Frontend is a React-based web application that provides an intuitive and responsive interface for managing employees, payroll, departments, job roles, and leave requests.

The frontend communicates with a Spring Boot backend using REST APIs secured through JWT Authentication.

---

# ✨ Features

## 🔐 Authentication & Authorization

* Secure Login
* Employee Self Registration
* JWT Token Authentication
* Logout Functionality
* Protected Routes
* Role-Based Access Control

---

## 👨‍💼 Employee Management

* View Employee Details
* Add Employee
* Update Employee Information
* Delete Employee
* Search Employees
* Employee Profile Management

---

## 🏢 Department Management

* Create Departments
* Edit Departments
* Delete Departments
* View Department Information

---

## 💼 Job Role Management

* Create Job Roles
* Update Salary Structures
* Assign Job Roles
* Manage Salary Details

---

## 📅 Leave Management

* Apply Leave Requests
* Track Leave Status
* View Leave History
* Leave Approval Workflow
* Leave Rejection Workflow

Supported Leave Types:

* Sick Leave
* Casual Leave
* Paid Leave
* Unpaid Leave

---

## 💰 Payroll Management

* View Payroll Information
* Payroll Summary
* Salary Details
* Employee Payroll History
* Payroll Status Tracking

---

## 📊 Dashboard Analytics

### Admin Dashboard

* Total Employees
* Total Departments
* Total Job Roles
* Pending Leave Requests
* Payroll Statistics

### Employee Dashboard

* Personal Information
* Payroll Summary
* Leave Summary
* Profile Information

---

## 📱 Modern UI/UX

* Responsive Design
* Mobile-Friendly Interface
* Bootstrap 5 Components
* Fast Navigation
* Dynamic Dashboard
* Modern User Experience

---

# 🏗️ Frontend Architecture

```mermaid
graph LR
    A[React Components] --> B[React Router]
    B --> C[Axios Service Layer]
    C --> D[Spring Boot APIs]
    D --> E[MySQL Database]
```

---

# 🛠️ Tech Stack

## Frontend Technologies

* React.js 19
* React Router DOM
* Axios
* Bootstrap 5
* Vite
* JavaScript ES6+
* HTML5
* CSS3

---

# 📂 Project Structure

```text
src/
│
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── employees/
│   ├── departments/
│   ├── jobs/
│   ├── leaves/
│   ├── payroll/
│   └── common/
│
├── services/
│   ├── api.js
│   └── authService.js
│
├── context/
├── hooks/
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🔄 Application Workflow

1. User opens the application.
2. User logs in or registers.
3. React frontend sends API requests using Axios.
4. Backend validates credentials.
5. JWT token is generated.
6. Token is stored in Local Storage.
7. Protected routes become accessible.
8. User accesses dashboard and management modules.

---

# 🔐 Authentication

The application uses JWT Authentication.

### User Flow

1. Login with credentials.
2. Backend validates user.
3. JWT token returned.
4. Token stored in Local Storage.
5. Authorization header attached to every request.
6. Protected routes verified before access.

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <frontend-repository-url>
```

## Navigate To Project

```bash
cd Employee-Payroll-Management-System-Frontend
```

## Install Dependencies

```bash
npm install
```

## Configure Backend URL

Update:

```javascript
src/services/api.js
```

```javascript
const API_BASE_URL =
'https://employee-management-system-backend-99hu.onrender.com/api/v1';
```

## Run Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# 🚀 Build For Production

```bash
npm run build
```

Preview Build:

```bash
npm run preview
```

---

# 📱 Screenshots

### Login Page

Add Screenshot Here

### Registration Page

Add Screenshot Here

### Admin Dashboard

Add Screenshot Here

### Employee Dashboard

Add Screenshot Here

### Employee Management

Add Screenshot Here

### Leave Management

Add Screenshot Here

### Payroll Management

Add Screenshot Here

---

# 🌐 Deployment

## Frontend Deployment

Platform: Vercel

Production URL:

https://employee-payroll-management-system-ashy.vercel.app

---

# 📈 Performance Metrics

* Fast Vite Build System
* Optimized API Requests
* Responsive UI Design
* Smooth Navigation Experience
* Reusable React Components

---

# 🧪 Testing

Frontend Testing Includes:

* UI Testing
* Form Validation Testing
* Authentication Testing
* Route Protection Testing
* API Integration Testing

---

# 🚀 Future Enhancements

* Attendance Management
* PDF Payslip Download
* Email Notifications
* Dark Mode Support
* Mobile Application
* Advanced Reporting Dashboard
* Employee Performance Tracking

---

# 📄 License

This project is developed for educational and learning purposes.

---

⭐ If you found this project useful, consider giving it a star on GitHub.
