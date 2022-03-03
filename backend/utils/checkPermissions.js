const { UnAuthenticatedError } = require('./../errors');

const checkPermissions = (requestUser, resourceUserId) => {
	if (requestUser.userId === resourceUserId.toString()) return;

	throw new UnAuthenticatedError('Not Authorized To Access This Route!');
};

module.exports = checkPermissions;
