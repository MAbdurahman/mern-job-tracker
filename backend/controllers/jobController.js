//**************** imports ****************//
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const moment = require('moment');
const Job = require('./../models/job');
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('./../errors');
const checkPermissions = require('./../utils/checkPermissions');

exports.createJob = async (req, res) => {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new BadRequestError('Please Provide All Values!');
	}
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

exports.getAllJobs = async (req, res) => {
	const jobs = await Job.find({createdBy: req.user.userId});
	if (!jobs) {
		throw new NotFoundError(`No Jobs For User ${req.user.name}`)
	}
	res.status(StatusCodes.OK).json({jobs, totalJobs: jobs.length, numOfPages: 1});
};

exports.deleteJob = async (req, res) => {
	res.send('controller - deleteJob');
};

exports.showStats = async (req, res) => {
	res.send('controller - showStats');
};

exports.updateJob = async (req, res) => {
	res.send('controller - updateJob');
};
