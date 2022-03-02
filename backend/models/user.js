//**************** imports ****************//
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//**************** variables ****************//
const name_pattern =
	/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const password_pattern =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
	const location_pattern = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/;


const lowercase_pattern = /^(?=.*[a-z])/g;
const uppercase_pattern = /^(?=.*[A-Z])/g;
const digit_pattern = /^(?=.*\d{1,})/g;
const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'First and last name are required!'],
		minlength: [4, 'Name must be at least 4 characters!'],
		maxLength: [32, 'Name cannot exceed 32 characters!'],
		match: [name_pattern, 'Enter first and last name!'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Email is required!'],
		unique: true,
		match: [email_pattern, 'Enter a valid email address!'],
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Password is required!'],
		match: [
			password_pattern,
			'Password -> at least 8 characters, have lowercase, uppercase, digit, and special character!',
		],
		select: false,
	},
	location: {
		type: String,
		trim: true,
		maxlength: 20,
		match: [location_pattern, 'Location -> Some City or Somecity, state abbreviation!'],
		default: 'Some City, ST',
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});
userSchema.pre('save', async function () {
	// console.log(this.modifiedPaths())
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

userSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};
module.exports = mongoose.model('User', userSchema);