const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  stickers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sticker' }],
  moodHistory: [{ date: Date, mood: String }],
});

module.exports = mongoose.model('User', userSchema);