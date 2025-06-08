import express from "express";
import {
	getAllTeachers,
	createTeacher,
} from "../controllers/teacherController.js";

import { teacherValidation } from "../middlewares/validator/teacherValidator.js";
import { handleValidationErrors } from "../middlewares/handleValidationError.js";

const router = express.Router();

router.get("/", getAllTeachers);
router.post("/", teacherValidation, handleValidationErrors, createTeacher);

export default router;
