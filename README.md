# 🚀 GigFlow – Full Stack Freelance Marketplace

GigFlow is a mini freelance marketplace platform where users can post jobs (gigs), bid on jobs, and hire freelancers.  
This project is developed as part of a **Full Stack Development Internship Assignment**.

---

## 📌 Features

### 🔐 Authentication

-   Secure user registration and login
-   JWT-based authentication using HttpOnly cookies
-   Protected routes for authenticated users

### 👥 Flexible Roles

-   No fixed roles such as Client or Freelancer
-   Any logged-in user can:
    -   Post a gig (acts as Client)
    -   Bid on gigs (acts as Freelancer)

### 📄 Gig Management

-   Create gigs with title, description, and budget
-   Browse all open gigs
-   Search gigs by title
-   Automatic gig status update after hiring

### 💬 Bidding System

-   Freelancers can submit bids with message and price
-   Gig owners can view all bids
-   Only the gig owner can hire a freelancer

### 🔥 Hiring Logic (Core Feature)

-   Only one freelancer can be hired per gig
-   Selected bid is marked as `hired`
-   All other bids are automatically marked as `rejected`
-   Implemented using MongoDB Transactions to prevent race conditions

### 🔔 Real-Time Notifications (Bonus Feature)

-   Implemented using Socket.IO
-   Freelancer receives instant notification when hired
-   No page refresh required

---

## 🛠 Tech Stack

### Frontend

-   React.js (Vite)
-   Tailwind CSS
-   Axios
-   React Router
-   Socket.IO Client

### Backend

-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   JWT Authentication
-   Socket.IO

---

## 🗂 Project Structure

GigFlow  
├── backend  
│ ├── controllers  
│ ├── models  
│ ├── routes  
│ ├── middleware  
│ ├── server.js  
│ └── .env.example  
│  
├── frontend  
│ ├── src  
│ │ ├── pages  
│ │ ├── components  
│ │ ├── context  
│ │ ├── services  
│ │ └── App.jsx  
│ └── .env  
│  
└── README.md

---

## ⚙️ Environment Variables

### Backend (`.env.example`)

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key

### Frontend (`.env`)

VITE_API_URL=http://localhost:5000/api

---

## 🚀 How to Run the Project Locally

### 1️⃣ Clone the Repository

git clone https://github.com/smttomar/gigflow.git  
cd gigflow

---

### 2️⃣ Backend Setup

cd backend  
npm install  
npm run dev

Backend runs on:  
http://localhost:5000

---

### 3️⃣ Frontend Setup

cd frontend  
npm install  
npm run dev

Frontend runs on:  
http://localhost:5173

---

## 🧪 Application Flow

1. Register two users (Client and Freelancer)
2. Login as Client → Create a gig
3. Login as Freelancer → Submit a bid
4. Login as Client → View bids → Hire freelancer
5. Freelancer receives real-time notification

---

## 🧠 Key Learnings

-   Secure authentication using JWT and cookies
-   MongoDB schema relationships and transactions
-   Race-condition-safe hiring logic
-   Real-time communication using Socket.IO
-   Frontend and backend integration best practices

---

## 🎯 Bonus Features Completed

-   Transaction-safe hiring logic
-   Real-time hire notifications
-   Role-based UI rendering
-   Environment-based configuration

---

## 👨‍💻 Author

Chandra Pratap Singh

---

## ✅ Final Note

This project follows industry best practices and demonstrates real-world full stack development concepts including authentication, database design, secure business logic, and real-time updates.
