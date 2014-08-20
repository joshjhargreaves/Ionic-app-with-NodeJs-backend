var express = require('express');
var app = express();

app.post('/', function(req){
	console.log('recieved post')
  res.send('Hello World');
});

var server = app.listen(9004, function() {
    console.log('Listening on port %d', server.address().port);
});
