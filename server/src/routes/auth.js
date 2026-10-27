import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user || !user.active || !(await bcrypt.compare(String(req.body.password || ""), user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }
    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET || "development_only_secret", { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, jobTitle: user.jobTitle } });
  } catch (e) { next(e); }
});

router.get("/me", requireAuth, (req, res) => res.json({ user: req.user }));

router.post("/register", requireAuth, allowRoles("hr"), async (req, res, next) => {
  try {
    const { name, email, password, role = "employee", department = "General", jobTitle = "Employee" } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: "Name, email, and password (8+ characters) are required" });
    if (!["hr", "manager", "employee"].includes(role)) return res.status(400).json({ message: "Invalid role" });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash, role, department, jobTitle });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, jobTitle: user.jobTitle } });
  } catch (e) { if (e.code === 11000) return res.status(409).json({ message: "Email already exists" }); next(e); }
});

export default router;
