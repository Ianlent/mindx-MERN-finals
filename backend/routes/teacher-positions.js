import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello from teacher-positions!");
});

export default router;
