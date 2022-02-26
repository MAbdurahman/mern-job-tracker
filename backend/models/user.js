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
const lowercase_pattern = /^(?=.*[a-z])/g;
const uppercase_pattern = /^(?=.*[A-Z])/g;
const digit_pattern = /^(?=.*\d{1,})/g;
const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'First and last name are required!'],
		minlength: [4, 'Name must be at least 4 characters!'],
		maxLength: [32, 'Name cannot exceed 32 characters!'],
		match: [name_pattern, 'Enter first and last name!'],
	},
	email: {
		type: String,
		required: [true, 'Email is required!'],
		unique: [true, 'Email already exists!'],
		validate: [validator.isEmail, 'Please enter a valid email address!'],
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
		match: [lowercase_pattern, 'Password must have a lowercase letter!'],
		match: [uppercase_pattern, 'Password must have an uppercase letter!'],
		match: [digit_pattern, 'Password must have a digit character!'],
		match: [
			special_pattern,
			`Password must include at least one - '-+!@#$%^&*?`,
		],
		match: [password_pattern, 'Password must be at least 8 characters!'],
		select: false,
	},
	location: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'my city',
	},
});
module.exports = mongoose.model('User', userSchema);