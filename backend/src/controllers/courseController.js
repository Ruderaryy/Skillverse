import Course from "../models/CoursesModel.js";

export async function createCourse(req, res) {
    try {
        const { title, description, price, creator } = req.body;

        const newCourse = new Course({ title, description, price, creator });
        await newCourse.save();

        res.json({ message: "Course created successfully!", course: newCourse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
