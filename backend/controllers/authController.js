//**************** imports ****************//
const User = require('./../models/user');

/*===================================================
   register a new user -> /api/v1/auth/register
======================================================*/
exports.registerUser = async (req, res) => {
	try {
      const user = await User.create(req.body);
      res.status(201).json({user});
   } catch (error) {
      res.status(500).json({message: 'Error occurred!'});
   }
};

exports.loginUser = async (req, res) => {
	res.send('login user controller');
};

exports.updateUser = async (req, res) => {
	res.send('update user controller');
};
