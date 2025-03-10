import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }, // In EDBX tokens
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
    videoUrl: { type: String }, // Could be stored in IPFS instead
}, { timestamps: true });

export default model("Course", CourseSchema);