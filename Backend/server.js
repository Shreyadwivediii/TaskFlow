require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const PORT = 5000;


const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);
 
const todoRoutes = require("./routes/todo");
app.use("/api/todo", todoRoutes);

// Start server only after DB connects

const startServer = async () => {
  try {
    await connectDB(); // DB connect first

    app.get("/", (req, res) => {
      res.send("API Running 🚀");
    });

    app.listen(PORT, () => {
      console.log("🔥 FILE IS RUNNING");
     
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("❌ Server start error:", error);
  }
};

startServer();