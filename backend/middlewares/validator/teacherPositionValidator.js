import { body } from "express-validator";

export const teacherPositionValidation = [
	body("name")
		.exists({ checkFalsy: true })
		.withMessage("Name is required")
		.isString()
		.withMessage("Name must be a string")
		.trim(),

	body("code")
		.exists({ checkFalsy: true })
		.withMessage("Code is required")
		.isString()
		.withMessage("Code must be a string")
		.trim(),

	body("des")
		.exists({ checkFalsy: true })
		.withMessage("Description is required")
		.isString()
		.withMessage("Description must be a string")
		.trim(),
];
