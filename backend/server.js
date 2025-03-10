import dotenv from 'dotenv'; 
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 3001;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
import path from "path";
const __dirname = path.resolve();
app.set("view engine", "ejs");  
app.set("views", path.join(__dirname, "views"));
app.use(session({ secret: "secretkey", resave: false, saveUninitialized: true }));

// app.use((req, res, next) => {
//     console.log(" Incoming Request:");
//     console.log(" Method:", req.method);
//     console.log(" URL:", req.url);
//     console.log(" Headers:", req.headers);

//     setTimeout(() => {
//         console.log("🔹 Body:", req.body);
//     }, 1000);

//     next();
// });

const start = async () => {
    app.set("mongo_user")
        const connectionDb = await mongoose.connect(uri)
        console.log(`Mongo connected DB Host: ${connectionDb.connection.host}`);
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
    })
}

import authRoutes from "./src/routes/usersRoute.js";
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.render("login"));
app.get("/dashboard", (req, res) => {
    // Check if session contains user data
    if (!req.session.user) {
        return res.redirect("/"); // Redirect to login if not authenticated
    }

    // Extract role from session user data
    const { role } = req.session.user;

    // Pass `role` to EJS template
    res.render("dashboard", { role });
});

async function fixIndexes() {
    try {
        // Wait until the database connection is established
        await mongoose.connection.asPromise();

        const db = mongoose.connection.db;
        if (!db) {
            console.log("❌ Database not connected.");
            return;
        }

        const collections = await db.listCollections().toArray();
        if (collections.some(col => col.name === "users")) {
            await db.collection("users").dropIndex("email_1").catch(err => console.log("No email index found"));
            console.log("✅ Dropped unique email index");
        }
    } catch (error) {
        console.error("❌ Error dropping index:", error);
    }
}

// Run the fix function after database connection is established
mongoose.connection.once("open", fixIndexes);


start();
