import express from "express";
import Scheme from "../models/Scheme.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public: get all schemes
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Protected: add new scheme
router.post("/", auth, async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
