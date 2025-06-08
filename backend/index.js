import "dotenv/config"; // Load environment variables from .env file FIRST

import express from "express";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from Express (ESM)!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
