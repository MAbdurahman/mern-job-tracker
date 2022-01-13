
const dotenv = require('dotenv');
const colors = require('colors');





//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});

//**************** variables ****************//
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;






//**************** app listening ****************//
const server = app.listen(PORT, () => {
   console.log(
		`The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`.yellow
	);
});