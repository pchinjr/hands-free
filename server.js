'use strict'

var Hapi = require('hapi');
var Mongoose = require('mongoose');

var server = new Hapi.Server(); 

server.connection({
  host: 'localhost',
  port: 8080,  
});

Mongoose.connect('mongodb://localhost/handsfree');

server.register(require('inert'), (err) => {
	if(err) {throw err;}
});

server.route(require('./lib/routes'));

server.start( (err) => {
  if(err) { throw err; }
  console.log('Server running at ' + server.info.uri)
});
