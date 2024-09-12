const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  try {
    const { stockSymbol, title, description, tags } = req.body;

    const post = new Post({
      stockSymbol,
      title,
      description,
      tags,
      user: req.user.id
    });

    await post.save();
    res.status(200).json({ success: true, postId: post._id, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};

// Fetch posts (with optional filters and sorting)
exports.getPosts = async (req, res) => {
  const { stockSymbol, tags, sortBy } = req.query;
  let query = {};
  
  if (stockSymbol) query.stockSymbol = stockSymbol;
  if (tags) query.tags = { $in: tags.split(',') };

  try {
    let posts = await Post.find(query).sort({ [sortBy || 'createdAt']: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await post.remove();
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};
