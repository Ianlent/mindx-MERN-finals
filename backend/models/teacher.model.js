import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const degreeSubschema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
	},
	school: {
		type: String,
		required: true,
	},
	major: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	isGraduated: {
		type: Boolean,
		default: true,
	},
});

const teacherSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		ref: "User",
		required: true,
		unique: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	startDate: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	teacherPositionsId: [
		{
			type: ObjectId,
			ref: "TeacherPosition",
		},
	],
	degrees: [
		{
			type: degreeSubschema,
		},
	],
});

export default mongoose.model("Teacher", teacherSchema);
