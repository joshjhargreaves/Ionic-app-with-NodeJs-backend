/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
//var gith = require('gith').create(9004);

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io').listen(server);
var sys = require('sys')
var exec = require('child_process').exec;
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  console.log('The Mongodb url is: ', config.mongo.uri);
});

/*gith({
  repo: 'hardgreaves/fullstack',
  branch: 'main'
}).on( 'all', function( payload ) {
	console.log('recieved request');
  function puts(error, stdout, stderr) { 
    sys.puts(stdout)
  }
  exec(". ~/fullstack/fullstack/deploy-develop.sh", puts); // command to be execute
});*/

// Expose app
exports = module.exports = app;