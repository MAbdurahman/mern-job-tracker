//**************** imports ****************//
const User = require('./../models/user');
const { StatusCodes } = require('http-status-codes');

/*===================================================
   register a new user -> /api/v1/auth/register
======================================================*/
exports.registerUser = async (req, res) => {
	
      const user = await User.create(req.body);
      res.status(StatusCodes.CREATED).json({user});
   
};

exports.loginUser = async (req, res) => {
	res.send('login user controller');
};

exports.updateUser = async (req, res) => {
	res.send('update user controller');
};
