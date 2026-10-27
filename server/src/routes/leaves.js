import { Router } from "express";
import { Leave } from "../models.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
const router = Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const filter = req.user.role === "employee" ? { employee: req.user._id } : {};
    const rows = await Leave.find(filter).populate("employee", "name email department").populate("reviewedBy", "name").sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) { next(e); }
});

router.post("/", allowRoles("employee", "manager", "hr"), async (req, res, next) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    if (!leaveType || !startDate || !endDate || !reason) return res.status(400).json({ message: "All leave fields are required" });
    if (new Date(endDate) < new Date(startDate)) return res.status(400).json({ message: "End date must be on or after start date" });
    const row = await Leave.create({ employee: req.user._id, leaveType, startDate, endDate, reason });
    res.status(201).json(row);
  } catch (e) { next(e); }
});

router.patch("/:id/status", allowRoles("hr", "manager"), async (req, res, next) => {
  try {
    const { status, reviewNote = "" } = req.body;
    if (!["approved", "rejected"].includes(status)) return res.status(400).json({ message: "Status must be approved or rejected" });
    const row = await Leave.findByIdAndUpdate(req.params.id, { status, reviewNote, reviewedBy: req.user._id }, { new: true, runValidators: true }).populate("employee", "name email department").populate("reviewedBy", "name");
    if (!row) return res.status(404).json({ message: "Leave request not found" });
    res.json(row);
  } catch (e) { next(e); }
});
export default router;
