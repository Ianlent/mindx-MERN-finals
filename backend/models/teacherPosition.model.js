import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	des: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		default: true,
		required: true,
	},
	isDeleted: {
		type: Boolean,
		default: false,
		required: true,
	},
});

export default mongoose.model("TeacherPosition", teacherPositionSchema);
