//**************** imports ****************//
const express = require('express');
const morgan = require('morgan');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const authenticatedUser = require('./middlewares/auth');
require('express-async-errors');




//**************** setting up config file ****************//
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//**************** variables ****************//
const app = express();


//**************** middleware****************//
if (process.env.NODE_ENV !== 'PRODUCTION') {
	app.use(morgan('dev'));
}
app.use(express.json());


//**************** import all routes ****************//
const authRouter = require('./routes/authRoutes');
const jobsRouter = require('./routes/jobRoutes');

//**************** app routes ****************//
app.get('/api/v1', (req, res) => {
   
   res.send('Welcome Job Trackers');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticatedUser, jobsRouter);



//**************** handle errors middleware ****************//
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);






module.exports = app;