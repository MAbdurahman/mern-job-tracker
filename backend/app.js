//**************** imports ****************//
const express = require('express');
const notFoundMiddleware = require('./middlewares/notFound');




//**************** setting up config file ****************//
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//**************** variables ****************//
const app = express();


//**************** middleware****************//


//**************** import all routes ****************//
app.get('/', (req, res) => {
   res.send('Welcome Job Trackers');
});


//**************** app routes ****************//




//**************** handle errors middleware ****************//
app.use(notFoundMiddleware);







module.exports = app;