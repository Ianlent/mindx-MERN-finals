import express from "express";
import { getAllTeachers } from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", getAllTeachers);

export default router;
