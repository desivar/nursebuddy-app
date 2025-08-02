const stickerSchema = new mongoose.Schema({
  name: String,        // e.g., "Med Master"
  image: String,       // URL or emoji
  description: String,
  earnedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Sticker', stickerSchema);