require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./config/db");

const authRoute = require("./routes/authRoute.js");
const incomeRoute = require("./routes/incomeRoute.js");
const expenseRoute = require("./routes/expenseRoute.js");
const dashboardRoute = require("./routes/dashboardRoute.js");
const reportRoute = require("./routes/reportRoute.js");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/income", incomeRoute);
app.use("/api/v1/expense", expenseRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/report", reportRoute);

connectDb();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server is running and listening on port ${PORT}`)
);
