import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employees.js";
import leaveRoutes from "./routes/leaves.js";
import attendanceRoutes from "./routes/attendance.js";
import announcementRoutes from "./routes/announcements.js";
import trainingRoutes from "./routes/trainings.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ status: "ok", app: "StaffSync API" }));
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/trainings", trainingRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/staffsync")
  .then(() => app.listen(port, () => console.log(`StaffSync API listening on ${port}`)))
  .catch((err) => { console.error("MongoDB connection failed:", err.message); process.exit(1); });
