// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route to log user join
app.post("/api/user-join", (req, res) => {
  const { email, password, joinedAt, userAgent } = req.body;

  const logEntry = {
    email,
    password,
    joinedAt: joinedAt || new Date().toISOString(),
    userAgent,
  };

  console.log("User Joined:", logEntry);

  const logFilePath = path.join(__dirname, "user-joins.log");
  fs.appendFile(logFilePath, JSON.stringify(logEntry) + "\n", (err) => {
    if (err) {
      console.error("Error saving user join:", err);
      return res.status(500).json({ message: "Failed to save" });
    }
    res.json({ message: "User join saved successfully" });
  });
});

// Optional: check server
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
