//**************** imports ****************//
const express = require('express');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');




//**************** setting up config file ****************//
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//**************** variables ****************//
const app = express();


//**************** middleware****************//
app.use(express.json());
app.use(errorHandlerMiddleware);

//**************** import all routes ****************//
const authRouter = require('./routes/authRoutes');

//**************** app routes ****************//
app.get('/', (req, res) => {
   
   res.send('Welcome Job Trackers');
});
app.use('api/v1/auth', authRouter);



//**************** handle errors middleware ****************//
app.use(notFoundMiddleware);







module.exports = app;