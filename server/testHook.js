var express = require('express');
var app = express();

app.post('/', function(req){
	console.log(recieved)
  res.send('Hello World');
});

var server = app.listen(9004, function() {
    console.log('Listening on port %d', server.address().port);
});

var gith = require('gith').create(9004); // ensure to match the port you entered in Github

gith().on( 'all', function( payload ) {
  console.log( 'Post-receive happened!' );
});
