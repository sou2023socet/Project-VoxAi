const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
const auth = require('../middleware/auth');


// GET all schemes
router.get('/', async (req, res) => {
const schemes = await Scheme.find().sort({ createdAt: -1 });
res.json(schemes);
});


// POST new scheme (protected)
router.post('/', auth, async (req, res) => {
const { title, description, eligibility, applyLink, category } = req.body;
const s = new Scheme({ title, description, eligibility, applyLink, category });
await s.save();
res.json(s);
});


module.exports = router;