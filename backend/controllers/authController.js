//**************** imports ****************//
const User = require('./../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('./../errors');

/*=========================================================
      register a new user -> /api/v1/auth/register
============================================================*/
exports.registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	if ( !name || !email || !password ) {
		throw new BadRequestError('Please provide all values!');
	}

	const userAlreadyExists = await User.findOne({ email });

	if ( userAlreadyExists ) {
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
/*======================================================
   login user -> /api/v1/auth/login
=========================================================*/
exports.loginUser = async (req, res) => {

	const { email, password } = req.body;

	if ( !email || !password ) {
		throw new BadRequestError('Please provide all values!');
	}

	const user = await User.findOne({ email }).select('+password');

	if ( !user ) {
		throw new UnauthenticatedError('Invalid email or password!');
	}

	const isPasswordCorrect = await user.comparePassword(password);

	if ( !isPasswordCorrect ) {
		throw new UnauthenticatedError('Invalid email or password!');

	}
	const token = user.createJWT();
	user.password = undefined;
	
	res.status(StatusCodes.OK).json({ user, token, location: user.location });

};
/*======================================================
   update user -> /api/v1/auth/update
======================================================*/
exports.updateUser = async (req, res) => {
	res.send('update user controller');
};
