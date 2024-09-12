const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
