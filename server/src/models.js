import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["hr", "manager", "employee"], default: "employee" },
  department: { type: String, default: "General" },
  jobTitle: { type: String, default: "Employee" },
  phone: { type: String, default: "" },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const leaveSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  leaveType: { type: String, enum: ["Annual", "Sick", "Personal", "Unpaid"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true, maxlength: 1000 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  reviewNote: { type: String, default: "" }
}, { timestamps: true });

const attendanceSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dateKey: { type: String, required: true },
  checkIn: { type: Date, default: null },
  checkOut: { type: Date, default: null }
}, { timestamps: true });
attendanceSchema.index({ employee: 1, dateKey: 1 }, { unique: true });

const announcementSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  body: { type: String, required: true, maxlength: 5000 },
  audience: { type: String, enum: ["all", "hr", "manager", "employee"], default: "all" },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const trainingSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  trainer: { type: String, default: "" },
  date: { type: Date, required: true },
  durationHours: { type: Number, min: 0.5, default: 1 },
  capacity: { type: Number, min: 1, default: 30 },
  enrollments: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export const User = mongoose.models.User || model("User", userSchema);
export const Leave = mongoose.models.Leave || model("Leave", leaveSchema);
export const Attendance = mongoose.models.Attendance || model("Attendance", attendanceSchema);
export const Announcement = mongoose.models.Announcement || model("Announcement", announcementSchema);
export const Training = mongoose.models.Training || model("Training", trainingSchema);
