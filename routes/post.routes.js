const express = require('express');

const { auth } = require('../middlewares/auth.middleware');
const { createPost, getPosts, deletePost, likePost, unlikePost } = require('../controllers/post.controllers');

const postRouter = express.Router();


postRouter.post('/create', auth, createPost);
postRouter.get('/', getPosts);
postRouter.delete('/:postId', auth, deletePost);
postRouter.post('/:postId/like', auth, likePost );
postRouter.delete('/:postId/like', auth, unlikePost);

module.exports = postRouter;
