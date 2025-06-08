import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";
import TeacherPosition from "../models/teacherPosition.model.js";

export const getAllTeachers = async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	const parsedPage = parseInt(page);
	const parsedLimit = parseInt(limit);
	const skip = (parsedPage - 1) * parsedLimit;
	try {
		const teachers = await Teacher.find()
			.skip(skip)
			.limit(parsedLimit)
			.populate({
				path: "userId",
				select: "name email phoneNumber address",
			})
			.populate({
				path: "teacherPositionsId",
				select: "name",
			})
			.select("code isActive teacherPositionsId degrees.type degrees.school");

		const formattedTeachers = teachers.map((teacher) => {
			return {
				code: teacher.code,
				name: teacher.userId ? teacher.userId.name : null,
				email: teacher.userId ? teacher.userId.email : null,
				phoneNumber: teacher.userId ? teacher.userId.phoneNumber : null,
				isActive: teacher.isActive,
				address: teacher.userId ? teacher.userId.address : null,
				// Now teacherPositions will contain the actual objects with name and code
				teacherPositions: teacher.teacherPositionsId.map((pos) => ({
					name: pos.name,
				})),
				degrees: teacher.degrees.map((degree) => ({
					type: degree.type,
					school: degree.school,
				})),
			};
		});

		const total_records = await Teacher.countDocuments();
		const totalPages = Math.ceil(total_records / parsedLimit);
		res.status(200).json({
			message: "success",
			data: formattedTeachers,
			page: parsedPage,
			limit: parsedLimit,
			totalPages: totalPages,
		});
	} catch (error) {
		console.error("Error fetching teachers:", error); // Log the full error for debugging
		res.status(500).json({ message: error.message });
	}
};

const generateUniqueTeacherCode = async () => {
	const characters = "0123456789";
	let code = "";
	for (let i = 0; i < 10; i++) {
		code += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	const existingTeacher = await Teacher.findOne({ code });

	if (existingTeacher) {
		return generateUniqueTeacherCode();
	} else {
		return code;
	}
};

export const createTeacher = async (req, res) => {
	try {
		const {
			userId,
			name,
			email,
			phoneNumber,
			address,
			identity,
			dob,
			startDate,
			endDate,
			teacherPositionsId,
			degrees,
		} = req.body;

		if (!identity || !dob) {
			return res
				.status(400)
				.json({ message: "Please provide identity and date of birth." });
		}

		let existingUser;
		if (userId) {
			existingUser = await User.findById(userId);
			if (!existingUser) {
				return res
					.status(404)
					.json({ message: "User not found with the provided userId." });
			}
		} else {
			if (!name || !email || !phoneNumber || !address) {
				return res.status(400).json({
					message:
						"Please provide all user details (name, email, phoneNumber, address) to create a new user for the teacher.",
				});
			}

			existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(409).json({
					message:
						"User with this email already exists. Please provide an existing userId or a different email.",
				});
			}

			const newUser = new User({
				name,
				email,
				phoneNumber,
				address,
				identity,
				dob,
				role: "TEACHER",
			});
			existingUser = await newUser.save();
		}

		if (existingUser.role !== "TEACHER") {
			existingUser.role = "TEACHER";
			await existingUser.save();
		}

		const teacherExists = await Teacher.findOne({ userId: existingUser._id });
		if (teacherExists) {
			return res
				.status(409)
				.json({ message: "A teacher entry already exists for this user." });
		}

		let teacherCode = await generateUniqueTeacherCode();

		if (teacherPositionsId && teacherPositionsId.length > 0) {
			const foundPositions = await TeacherPosition.find({
				_id: { $in: teacherPositionsId },
			});
			if (foundPositions.length !== teacherPositionsId.length) {
				return res.status(400).json({
					message: "One or more teacher positions provided are invalid.",
				});
			}
		}

		const newTeacher = new Teacher({
			userId: existingUser._id,
			code: teacherCode,
			startDate: startDate || Date.now(),
			endDate: endDate || null,
			teacherPositionsId: teacherPositionsId || [],
			degrees: degrees || [],
		});

		const savedTeacher = await newTeacher.save();

		res.status(201).json({
			message: "Teacher created successfully",
			teacher: savedTeacher,
			user: existingUser,
		});
	} catch (error) {
		console.error("Error creating teacher:", error);
		if (error.name === "ValidationError") {
			return res
				.status(400)
				.json({ message: error.message, errors: error.errors });
		}
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
