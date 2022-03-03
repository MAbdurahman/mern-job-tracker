import mongoose from 'mongoose';

const location_pattern = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/;

const jobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
         trim: true,
			required: [true, 'Enter company name!'],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, 'Enter job position!'],
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		jobType: {
			type: String,
			enum: ['full-time', 'part-time', 'remote', 'internship'],
			default: 'full-time',
		},
		jobLocation: {
			type: String,
			required: [true, 'Enter job location - City, ST!'],
			trim: true,
			maxlength: 30,
			match: [
				location_pattern,
				'Job Location -> Some City or Somecity, state abbreviation!',
			],
			default: 'Some City, ST',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'User is required!'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Job', jobSchema);
