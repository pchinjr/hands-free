'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server(); 

server.connection({
  host: 'localhost',
  port: 8080,  
});

server.register(require('inert'), (err) => {
	if(err) {throw err;}
});

server.route(require('./lib/routes'));

server.start( (err) => {
  if(err) { throw err; }
  console.log('Server running at ' + server.info.uri)
});
