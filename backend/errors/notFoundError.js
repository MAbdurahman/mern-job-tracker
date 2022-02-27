const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./customAPIError');

class NotFoundError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

module.exports = NotFoundError;
