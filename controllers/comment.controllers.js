const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create new comment
    const newComment = new Comment({
      user: req.user.id,  // Logged-in user ID
      post: postId,
      comment,
    });


    const savedComment = await newComment.save();

    
    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json({
      success: true,
      commentId: savedComment._id,
      message: 'Comment added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment from a post
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    post.comments = post.comments.filter(cmt => cmt.toString() !== commentId);
    await post.save();

    await comment.remove();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
