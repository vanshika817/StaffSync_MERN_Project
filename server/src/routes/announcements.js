import { Router } from "express";
import { Announcement } from "../models.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
const router = Router();
router.use(requireAuth);
router.get("/", async (req, res, next) => {
  try {
    const rows = await Announcement.find({ $or: [{ audience: "all" }, { audience: req.user.role }] }).populate("author", "name").sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) { next(e); }
});
router.post("/", allowRoles("hr"), async (req, res, next) => {
  try {
    const { title, body, audience = "all" } = req.body;
    if (!title || !body) return res.status(400).json({ message: "Title and body are required" });
    const row = await Announcement.create({ title, body, audience, author: req.user._id });
    res.status(201).json(row);
  } catch (e) { next(e); }
});
export default router;
