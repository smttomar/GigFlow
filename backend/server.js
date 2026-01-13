import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: "*", // 🔓 allow frontend from anywhere
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

// DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(console.error);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
