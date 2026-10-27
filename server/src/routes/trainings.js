import { Router } from "express";
import { Training } from "../models.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
const router = Router();
router.use(requireAuth);
router.get("/", async (_req, res, next) => {
  try { res.json(await Training.find().populate("enrollments", "name email").sort({ date: 1 })); }
  catch (e) { next(e); }
});
router.post("/", allowRoles("hr", "manager"), async (req, res, next) => {
  try {
    const { title, description, trainer = "", date, durationHours = 1, capacity = 30 } = req.body;
    if (!title || !description || !date) return res.status(400).json({ message: "Title, description, and date are required" });
    const row = await Training.create({ title, description, trainer, date, durationHours, capacity });
    res.status(201).json(row);
  } catch (e) { next(e); }
});
router.post("/:id/enroll", async (req, res, next) => {
  try {
    const row = await Training.findById(req.params.id);
    if (!row) return res.status(404).json({ message: "Training not found" });
    if (row.enrollments.some(id => String(id) === String(req.user._id))) return res.status(409).json({ message: "Already enrolled" });
    if (row.enrollments.length >= row.capacity) return res.status(409).json({ message: "Training is full" });
    row.enrollments.push(req.user._id); await row.save();
    res.json(row);
  } catch (e) { next(e); }
});
export default router;
