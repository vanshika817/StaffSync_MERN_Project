import { Router } from "express";
import { User } from "../models.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", allowRoles("hr", "manager"), async (req, res, next) => {
  try {
    const filter = req.user.role === "manager" ? { department: req.user.department } : {};
    const users = await User.find(filter).select("-passwordHash").sort({ name: 1 });
    res.json(users);
  } catch (e) { next(e); }
});

router.get("/me", async (req, res) => res.json(req.user));

router.get("/:id", async (req, res, next) => {
  try {
    if (req.user.role === "employee" && String(req.user._id) !== req.params.id) return res.status(403).json({ message: "You can only view your own profile" });
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Employee not found" });
    res.json(user);
  } catch (e) { next(e); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const isSelf = String(req.user._id) === req.params.id;
    if (!isSelf && req.user.role !== "hr") return res.status(403).json({ message: "Only HR can edit another employee" });
    const allowed = isSelf ? ["name", "phone"] : ["name", "phone", "department", "jobTitle", "role", "active"];
    const update = {};
    for (const key of allowed) if (req.body[key] !== undefined) update[key] = req.body[key];
    if (update.role && !["hr", "manager", "employee"].includes(update.role)) return res.status(400).json({ message: "Invalid role" });
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Employee not found" });
    res.json(user);
  } catch (e) { next(e); }
});

router.post("/", allowRoles("hr"), async (req, res, next) => {
  try {
    const { name, email, password, role = "employee", department = "General", jobTitle = "Employee" } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: "Name, email, and password (8+ characters) are required" });
    const user = await User.create({ name, email, passwordHash: await (await import("bcryptjs")).default.hash(password, 12), role, department, jobTitle });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, jobTitle: user.jobTitle });
  } catch (e) { if (e.code === 11000) return res.status(409).json({ message: "Email already exists" }); next(e); }
});
export default router;
