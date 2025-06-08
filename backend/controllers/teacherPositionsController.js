import TeacherPosition from "../models/teacherPosition.model.js";

export const getAllTeacherPositions = async (req, res) => {
	try {
		const teacherPositions = await TeacherPosition.find();
		res.json(teacherPositions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching teacher positions." });
	}
};

export const createTeacherPosition = async (req, res) => {
	try {
		const { name, code, des } = req.body;

		const codeExists = await TeacherPosition.findOne({ code });
		if (codeExists) {
			return res.status(409).json({
				message:
					"Teacher position code already in use. Please provide a unique code.",
			});
		}

		const newTeacherPosition = new TeacherPosition({
			name,
			code,
			des,
		});

		const savedTeacherPosition = await newTeacherPosition.save();

		res.status(201).json({
			message: "Teacher position created successfully",
			teacherPosition: savedTeacherPosition.toObject(),
		});
	} catch (error) {
		console.error("Error creating teacher position:", error);
		if (error.name === "ValidationError") {
			return res
				.status(400)
				.json({ message: error.message, errors: error.errors });
		}
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
