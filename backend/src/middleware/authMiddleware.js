import UsersModel from "../models/UsersModel.js";  // Correct import

export async function verifyInstructor(req, res, next) {
    try {
        const userAddress = req.body.ethereumAddress;

        const user = await UsersModel.findOne({ ethereumAddress: userAddress });  // Corrected `findOne` usage

        if (!user || user.role !== "instructor") {
            return res.status(403).json({ error: "Access denied. Instructors only." });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
