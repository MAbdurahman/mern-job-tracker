const express = require('express');
const {
	loginUser,
	registerUser,
	updateUser,
} = require('./../controllers/authController');
const authenticatedUser = require('./../middlewares/auth');

//**************** variables ****************//
const router = express.Router();

//**************** auth routes ****************//
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/update').patch(authenticatedUser, updateUser);

module.exports = router;
