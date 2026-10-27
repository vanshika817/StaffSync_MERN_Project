import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User, Announcement, Training } from "./models.js";
dotenv.config();
if (process.env.SEED_DEMO !== "true") {
  console.log("Set SEED_DEMO=true in .env to create demo data.");
  process.exit(0);
}
await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/staffsync");
const passwordHash = await bcrypt.hash("StaffSync123!", 12);
const demos = [
  { name: "StaffSync HR", email: "hr@staffsync.local", role: "hr", department: "People Operations", jobTitle: "HR Administrator" },
  { name: "Morgan Manager", email: "manager@staffsync.local", role: "manager", department: "Engineering", jobTitle: "Team Manager" },
  { name: "Alex Employee", email: "employee@staffsync.local", role: "employee", department: "Engineering", jobTitle: "Software Engineer" }
];
for (const demo of demos) await User.updateOne({ email: demo.email }, { $setOnInsert: { ...demo, passwordHash } }, { upsert: true });
const hr = await User.findOne({ email: "hr@staffsync.local" });
await Announcement.updateOne({ title: "Welcome to StaffSync" }, { $setOnInsert: { title: "Welcome to StaffSync", body: "Welcome! Please keep your profile up to date and review the employee handbook.", audience: "all", author: hr._id } }, { upsert: true });
await Training.updateOne({ title: "Workplace Communication Essentials" }, { $setOnInsert: { title: "Workplace Communication Essentials", description: "A practical introduction to clear and respectful workplace communication.", trainer: "People Operations", date: new Date(Date.now() + 7 * 86400000), durationHours: 2, capacity: 30 } }, { upsert: true });
console.log("Seed complete. Demo accounts use password StaffSync123!");
await mongoose.disconnect();
