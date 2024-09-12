const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  stockSymbol: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Post', PostSchema);
