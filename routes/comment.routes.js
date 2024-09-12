const express = require('express');
const { addComment, deleteComment } = require('../controllers/comment.controllers');
const { auth } = require('../middlewares/auth.middleware');
const commentRouter = express.Router();

commentRouter.post('/:postId/comments', auth, addComment);
commentRouter.delete('/:postId/comments/:commentId', auth, deleteComment);

module.exports = commentRouter;
