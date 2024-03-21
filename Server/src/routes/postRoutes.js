const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn');
const {createPost, updatePost, deletePost, getPosts} = require('../controllers/postControllers');
const deletedPostMiddleware = require('../middlewares/deleteMiddleware');

router.route('/post/create').post(isLoggedIn, createPost);

router.route('/post/update/:id').put(isLoggedIn, updatePost);

router.route('/post/delete/:id').delete(deletedPostMiddleware, deletePost);

router.route('/posts').get(getPosts);

module.exports = router 