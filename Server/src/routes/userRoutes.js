const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn');

const {signup, login, logout, update, getManyUsers} = require('../controllers/userController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/user/:id').put(isLoggedIn, update);
router.route('/logout').get(logout);
router.route('/users').get(isLoggedIn, getManyUsers);

module.exports = router