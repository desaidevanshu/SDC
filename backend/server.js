import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import ug1FormRoutes from "./routes/ug1FormRoutes.js"; // Include the new route

dotenv.config();

const app = express();

app.use(cors());
// 🔹 CORS Setup
/*app.use(
  cors({
    origin: ["http://localhost:5173"], // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); */

// 🔹 Middleware
app.use(express.json());
app.use(cookieParser());

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Users",
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/ug1form", ug1FormRoutes); // Include UG1 Form routes

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
