import Teacher from "../models/teacher.model.js";

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
