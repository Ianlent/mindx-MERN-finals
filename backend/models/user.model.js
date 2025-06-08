import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	identity: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		required: true,
		enum: ["STUDENT", "TEACHER", "ADMIN"],
	},
});

export default mongoose.model("User", userSchema);
