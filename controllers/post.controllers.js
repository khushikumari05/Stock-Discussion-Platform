const Post = require('../models/post.model');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { stockSymbol, title, description, tags } = req.body;

    const post = new Post({
      stockSymbol,
      title,
      description,
      tags,
      user: req.user.id,
    });

    await post.save();

    res.status(200).json({
      success: true,
      postId: post._id,
      message: 'Post created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch posts with optional filters (stockSymbol, tags) and sorting (sortBy)
// Includes pagination
exports.getPosts = async (req, res) => {
  try {
    const { stockSymbol, tags, sortBy, page = 1, limit = 10 } = req.query;
    let query = {};

    if (stockSymbol) {
      query.stockSymbol = stockSymbol;
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    // Fetch filtered posts with pagination
    const posts = await Post.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ [sortBy || 'createdAt']: -1 });

    const totalPosts = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
      posts,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post by its ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

  
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized to delete this post' });
    }

    // Remove the post
    await post.remove();
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
