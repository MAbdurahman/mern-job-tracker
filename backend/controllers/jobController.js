//**************** imports ****************//
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const moment = require('moment');
const Job = require('./../models/job');
const {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} = require('./../errors');
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
	const { jobType, search, sort, status } = req.query;
	const queryObject = { createdBy: req.user.userId };

	//**************** based on the condition ****************//
	if (status && status !== 'all') {
		queryObject.status = status;
	}
	if (jobType && jobType !== 'all') {
		queryObject.jobType = jobType;
	}
	if (search) {
		queryObject.position = { $regex: search, $options: 'i' };
	}

	//*** not ready for 'await' -> chaining the sort conditions ***//
	let result = Job.find(queryObject);

	//************* chaining sort conditions*************//
	if (sort === 'latest') {
		result = result.sort('-createdAt');
	}
	if (sort === 'oldest') {
		result = result.sort('createdAt');
	}
	if (sort === 'a-z') {
		result = result.sort('position');
	}
	if (sort === 'z-a') {
		result = result.sort('-position');
	}

	//**************** pagination setup ****************//
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const jobs = await result;

	const totalJobs = await Job.countDocuments(queryObject);
	const numOfPages = Math.ceil(totalJobs / limit);

	res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
	
};

exports.updateJob = async (req, res) => {
	const { id: jobId } = req.params;
	const { company, position } = req.body;

	if (!position || !company) {
		throw new BadRequestError('Please Provide All Values!');
	}
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No Job Found With ID: ${jobId}`);
	}

	//******** check whether user created the job ********//
	checkPermissions(req.user, job.createdBy);

	const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(StatusCodes.OK).json({ updatedJob });
};

exports.deleteJob = async (req, res) => {
	const { id: jobId } = req.params;

	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No Job Found With ID: ${jobId}`);
	}

	//******** check whether user created the job ********//
	checkPermissions(req.user, job.createdBy);

	await job.remove();

	res.status(StatusCodes.OK).json({ msg: 'Successfully Deleted Job!' });
	
};

exports.showStats = async (req, res) => {
	let stats = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: '$status', count: { $sum: 1 } } },
	]);
	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: {
					year: { $year: '$createdAt' },
					month: { $month: '$createdAt' },
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 },
	]);
	monthlyApplications = monthlyApplications
		.map(item => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format('MMM Y');
			return { date, count };
		})
		.reverse();

	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
