require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const aiRoutes = require("./routes/ai");

const app = express();

app.use("/api/ai", aiRoutes);

app.use(cors({origin:"*"}));
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});