//**************** imports ****************//
const User = require('./../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('./../errors');

/*=========================================================
      register a new user -> /api/v1/auth/register
============================================================*/
exports.registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new BadRequestError('Please provide all values!');
	}

	const userAlreadyExists = await User.findOne({ email });

	if (userAlreadyExists) {
		throw new BadRequestError('Email already exists!');
	}

	const user = await User.create({ name, email, password });

      const token = user.createJWT();

      res.status(StatusCodes.CREATED).json({
			user: {
				email: user.email,
				name: user.name,
                        createdAt: user.createdAt,
				location: user.location,
			},
			token,
			location: user.location,
		});
};

exports.loginUser = async (req, res) => {
	res.send('login user controller');
};

exports.updateUser = async (req, res) => {
	res.send('update user controller');
};
