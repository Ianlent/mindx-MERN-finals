import { body } from "express-validator";

export const teacherValidation = [
	// userId is optional. If provided, it should not be falsy.
	// No "required" message, as it's optional for the request body.
	body("userId")
		.optional()
		.isMongoId()
		.withMessage("Invalid userId format if provided."),

	body("name")
		.if((value, { req }) => !req.body.userId)
		.exists({ checkFalsy: true })
		.withMessage("name is required when creating a new user for the teacher"),

	body("email")
		.if((value, { req }) => !req.body.userId)
		.exists({ checkFalsy: true })
		.withMessage("email is required when creating a new user for the teacher")
		.isEmail()
		.withMessage("Valid email is required"),

	body("phoneNumber")
		.if((value, { req }) => !req.body.userId)
		.exists({ checkFalsy: true })
		.withMessage(
			"phoneNumber is required when creating a new user for the teacher"
		),
	body("address")
		.if((value, { req }) => !req.body.userId)
		.exists({ checkFalsy: true })
		.withMessage(
			"address is required when creating a new user for the teacher"
		),

	body("identity")
		.exists({ checkFalsy: true })
		.withMessage("identity is required")
		.isString()
		.withMessage("identity must be a string")
		.matches(/^\d{12}$/)
		.withMessage(
			"identity must be a 12-digit number (Vietnamese National ID format)"
		),
	body("dob")
		.exists({ checkFalsy: true })
		.withMessage("dob is required")
		.isISO8601()
		.toDate()
		.withMessage("Invalid date of birth format (YYYY-MM-DD)"),

	body("startDate")
		.optional()
		.isISO8601()
		.toDate()
		.withMessage("Invalid startDate format (YYYY-MM-DD)"),

	body("endDate")
		.exists({ checkFalsy: true })
		.isISO8601()
		.toDate()
		.withMessage("Invalid endDate format (YYYY-MM-DD)"),

	body("teacherPositionsId")
		.optional()
		.isArray()
		.withMessage("teacherPositionsId must be an array")
		.custom((value) => {
			// Check if all elements in the array are valid MongoIds
			if (value && value.length > 0) {
				for (const id of value) {
					if (!id.match(/^[0-9a-fA-F]{24}$/)) {
						// Basic check for MongoId format
						throw new Error("Each teacherPositionsId must be a valid Mongo ID");
					}
				}
			}
			return true;
		}),
	body("degrees")
		.optional()
		.isArray()
		.withMessage("degrees must be an array")
		.custom((value) => {
			// Basic validation for each degree object structure
			if (value && value.length > 0) {
				for (const degree of value) {
					if (!degree.type || !degree.school || !degree.major || !degree.year) {
						throw new Error(
							"Each degree must have type, school, major, and year"
						);
					}
					if (
						typeof degree.type !== "string" ||
						typeof degree.school !== "string" ||
						typeof degree.major !== "string" ||
						typeof degree.year !== "number"
					) {
						throw new Error(
							"Degree fields must have correct types (string for type, school, major; number for year)"
						);
					}
				}
			}
			return true;
		}),
];
