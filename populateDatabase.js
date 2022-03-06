//********************* imports *********************//
const dotenv = require('dotenv');
const colors = require('colors');
const Job = require('./backend/models/job');
const jobsData = require('./data/mock-jobs.json');
const connectDatabase = require('./backend/config/databaseConfig');

//**************** configuration setup ***************//
dotenv.config({ path: 'backend/config/config.env' });
colors.enable();

//**************** connect to database ****************//
connectDatabase();

//***************** populate database *****************//
const populateJobs = async () => {
	try {
		await Job.deleteMany();
		console.log(colors.brightGreen.italic('Successfully deleted all jobs!'));

		await Job.insertMany(jobsData);
		console.log(colors.brightGreen.italic('Successfully created jobs!!'));

		process.exit();
	} catch (error) {
		console.log(colors.brightRed.italic(error));
		process.exit(1);
	}
};

populateJobs();
