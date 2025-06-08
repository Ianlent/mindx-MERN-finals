import express from "express";
import {
	getAllTeacherPositions,
	createTeacherPosition,
} from "../controllers/teacherPositionsController.js";
import { teacherPositionValidation } from "../middlewares/validator/teacherPositionValidator.js";
import { handleValidationErrors } from "../middlewares/handleValidationError.js";

const router = express.Router();

router.get("/", getAllTeacherPositions);
router.post(
	"/",
	teacherPositionValidation,
	handleValidationErrors,
	createTeacherPosition
);

export default router;
