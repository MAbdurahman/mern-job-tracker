//**************** imports ****************//
const express = require('express');
const morgan = require('morgan');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');




//**************** setting up config file ****************//
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//**************** variables ****************//
const app = express();


//**************** middleware****************//
app.use(express.json());
app.use(errorHandlerMiddleware);
if (process.env.NODE_ENV !== 'PRODUCTION') {
	app.use(morgan('dev'));
}

//**************** import all routes ****************//
const authRouter = require('./routes/authRoutes');
const jobsRouter = require('./routes/jobRoutes');

//**************** app routes ****************//
app.get('/', (req, res) => {
   
   res.send('Welcome Job Trackers');
});
app.use('api/v1/auth', authRouter);
app.use('api/v1/jobs', jobsRouter);



//**************** handle errors middleware ****************//
app.use(notFoundMiddleware);







module.exports = app;