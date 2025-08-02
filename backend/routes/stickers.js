// backend/models/Sticker.js

const mongoose = require('mongoose'); // ✅ This was missing!

const stickerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String, // e.g., emoji like '💊' or URL
    default: '🌟'
  },
  description: {
    type: String
  },
  // Optional: track who earned it
  earnedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Sticker', stickerSchema);

// --- ONLY FOR TESTING ---
// Remove or disable in production
router.get('/seed', async (req, res) => {
  const stickerData = [
    { name: 'Med Master', image: '💊', description: 'Gave meds on time!' },
    { name: 'IV Hero', image: '💉', description: 'Fixed the drip!' },
    { name: 'Heart Helper', image: '❤️‍🩹', description: 'Patient smiled today!' },
    { name: 'Night Owl', image: '🦉', description: 'Survived the night shift!' },
    { name: 'Hydration Hero', image: '💧', description: 'Drank 8 glasses!' },
    { name: 'Compassion Star', image: '🌟', description: 'Made someone feel seen!' },
    { name: 'Team Player', image: '🤝', description: 'Helped a coworker!' },
    { name: 'Calm Captain', image: '⛵', description: 'Stayed cool under pressure!' }
  ];

  try {
    // Clear existing stickers
    await Sticker.deleteMany({});
    // Insert new ones
    await Sticker.insertMany(stickerData);
    res.json({ 
      msg: '✅ Stickers seeded successfully!', 
      count: stickerData.length 
    });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ msg: 'Seed failed', error: err.message });
  }
});