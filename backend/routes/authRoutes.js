const express = require('express');
const { loginUser, registerUser, updateUser } = require('./../controllers/authController');



//**************** variables ****************//
const router = express.Router();

//**************** auth routes ****************//
router.route('register').post(registerUser);
router.route('login').post(loginUser);
router.route('update').patch(updateUser);

module.exports = router;