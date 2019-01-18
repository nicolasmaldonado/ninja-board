/*
 * Main file of the API
 *
 */

//Dependencies
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./lib/config.js');

// Import routes
const sampleRoutes = require('./routes/sample.routes');
const groupRoutes = require('./routes/group.routes');
const activityRoutes = require('./routes/activity.routes');

//@TODO: REMOVE THIS.
const helpers = require('./lib/helpers');

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://'+config.dbUser+':'+config.dbPswd+'@ds157574.mlab.com:57574/productstutorial';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setting express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/sample', sampleRoutes);
app.use('/group', groupRoutes);
app.use('/activity', activityRoutes);

// Launch server
app.listen(config.httpPort, () => {
	//console.log(helpers.hash('password'));
    console.log('Server is up and running on port number ' + config.httpPort);
});
