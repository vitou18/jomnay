# 🧾 Jomnay App – Expense Tracking System

**Jomnay** is a full-stack expense tracking web application built to help users manage and visualize their income and expenses with ease. With a modern UI and robust backend, it supports real-time tracking, reporting, and exporting of financial data.

---

## 📌 Features

- 🔐 Secure JWT-based user authentication
- ➕ Add, edit, and delete income & expense records
- 📊 Visualize data with interactive charts
- 📁 Export reports to PDF and Excel formats
- 🗂️ Filter by month and category
- 📱 Responsive and mobile-friendly UI

---

## 🛠️ Technology Stack

### ⚙️ Backend

- **Node.js** – Server-side JavaScript runtime
- **Express.js** – Web framework for RESTful APIs
- **MongoDB** – NoSQL database for flexible data storage
- **Mongoose** – ODM for MongoDB with schema support
- **JWT (JSON Web Token)** – Token-based authentication
- **XLSX** – Export data to `.xlsx` Excel format
- **pdfkit** – Generate downloadable PDFs
- **dotenv** – Manage environment variables securely
- **Nodemon** – Auto-restart server during development

### 🖥️ Frontend

- **React.js** – Build fast and modular UIs
- **Redux Toolkit** – Global state management
- **React Router DOM** – Page routing
- **Axios** – Communicate with backend APIs
- **Tailwind CSS** – Utility-first CSS framework
- **ApexCharts / React-ApexCharts** – Beautiful charts & graphs
- **Moment.js** – Handle and format dates
- **React CountUp** – Animated number counters
- **React Hot Toast** – Toast notifications
- **React Icons** – Scalable icon library

---

## 🚀 Getting Started

### 🧾 Clone the Repository

```bash
git clone https://github.com/your-username/jomnay-app.git
cd jomnay-app
```

---

### 📦 Backend Setup

```bash
cd backend
npm install
```

#### 🛠️ Create a `.env` file

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### ▶️ Start Backend Server

```bash
npm run dev
```

> 🔗 Local Server: [http://localhost:8000](http://localhost:8000)  
> 🌍 Live Backend API: [https://jomnay.onrender.com/api/v1](https://jomnay.onrender.com/api/v1)

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> 🔗 Local Frontend: [http://localhost:5173](http://localhost:5173)  
> 🌍 Live Frontend App: [https://jomnay.vercel.app/](https://jomnay.vercel.app/)

---

## 🌐 Deployment

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 📜 License

MIT License © 2025 [Meng Vuthvitou](https://github.com/vitou18)
