const express = require('express');
const {
	createJob,
	deleteJob,
	getAllJobs,
	showStats,
	updateJob,
} = require('./../controllers/jobController');


//**************** variables ****************//
const router = express.Router();

//**************** job routes ****************//
router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);


module.exports = router;
