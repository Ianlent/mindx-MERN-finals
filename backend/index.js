import "dotenv/config"; // Load environment variables from .env file FIRST
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

//models
import User from "./models/user.model.js";
import Teacher from "./models/teacher.model.js";
import TeacherPosition from "./models/teacherPosition.model.js";

import teacherRoutes from "./routes/teachers.js";
import teacherPositions from "./routes/teacher-positions.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Routes
app.use("/teachers", teacherRoutes);
app.use("/teacher-positions", teacherPositions);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
