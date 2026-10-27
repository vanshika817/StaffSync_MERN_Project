import { Router } from "express";
import { Attendance } from "../models.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
const router = Router();
router.use(requireAuth);
const todayKey = () => new Date().toISOString().slice(0, 10);

router.get("/", allowRoles("hr", "manager"), async (req, res, next) => {
  try {
    const filter = req.user.role === "manager" ? {} : {};
    const rows = await Attendance.find(filter).populate("employee", "name email department").sort({ dateKey: -1 }).limit(500);
    res.json(rows);
  } catch (e) { next(e); }
});
router.get("/me", async (req, res, next) => {
  try { res.json(await Attendance.find({ employee: req.user._id }).sort({ dateKey: -1 }).limit(90)); }
  catch (e) { next(e); }
});
router.post("/check-in", async (req, res, next) => {
  try {
    const dateKey = todayKey();
    let row = await Attendance.findOne({ employee: req.user._id, dateKey });
    if (row?.checkIn) return res.status(409).json({ message: "You have already checked in today" });
    if (!row) row = new Attendance({ employee: req.user._id, dateKey });
    row.checkIn = new Date();
    await row.save();
    res.status(201).json(row);
  } catch (e) { next(e); }
});
router.post("/check-out", async (req, res, next) => {
  try {
    const row = await Attendance.findOne({ employee: req.user._id, dateKey: todayKey() });
    if (!row?.checkIn) return res.status(400).json({ message: "Check in before checking out" });
    if (row.checkOut) return res.status(409).json({ message: "You have already checked out today" });
    row.checkOut = new Date(); await row.save(); res.json(row);
  } catch (e) { next(e); }
});
export default router;
