import { Schema, model } from "mongoose";

// const UserSchema = new Schema({
//     ethereumAddress: { type: String, unique: true, required: true },
//     username: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     role: { type: String, enum: ["student", "instructor"], default: "student" },
//     enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
//     earnedTokens: { type: Number, default: 0 },
// }, { timestamps: true });

const UserSchema = new Schema({
    ethereumAddress: { type: String, required: true, unique: true },
    username: { type: String, default: "New User" },
    role: { type: String, enum: ["student", "instructor"], default: "student" }
});

export default model("User", UserSchema);