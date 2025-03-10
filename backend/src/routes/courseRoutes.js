import { Router } from "express";
import { createCourse } from "../controllers/courseController.js";
import { verifyInstructor } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifyInstructor, createCourse);

export default router;
