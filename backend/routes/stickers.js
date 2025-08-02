// backend/routes/stickers.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Sticker = require('../models/Sticker');

// 🎯 GET /api/stickers
// Get all stickers (or just earned ones)
router.get('/', auth, async (req, res) => {
  try {
    const stickers = await Sticker.find({});
    res.json(stickers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// 🎉 POST /api/stickers/earn/:id
// Mark a sticker as earned by the user
router.post('/earn/:id', auth, async (req, res) => {
  try {
    const sticker = await Sticker.findById(req.params.id);
    if (!sticker) return res.status(404).json({ msg: 'Sticker not found' });

    const user = await require('../models/User').findById(req.user.id);
    if (!user.stickers.includes(sticker._id)) {
      user.stickers.push(sticker._id);
      await user.save();
    }

    res.json({ msg: 'Sticker earned!', sticker });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;