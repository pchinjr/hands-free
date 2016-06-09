'use strict'

var Hapi = require('hapi');
var Mongoose = require('mongoose');
var UserStore = require('./lib/userStore');

UserStore.initialize();

var server = new Hapi.Server(); 

server.connection({
  host: 'localhost',
  port: 8080,  
});

Mongoose.connect('mongodb://localhost/handsfree');

server.register(require('inert'), (err) => {
	if(err) {throw err;}
});

server.register(require('hapi-auth-cookie'), function(err) {
	if(err) console.log(err);

	server.auth.strategy('default', 'cookie', {
		password: 'myPasswordisnotverysecure334555333ZE6#4bM9ot#KEzGPF4ciZXSfgbfJNWZ',
		cookie: '334555333ZE6#4bM9ot#KEzGPF4ciZXSfgbfJNWZ',
		redirectTo: '/login',
		isSecure: false
	});

	server.auth.default('default');
});

server.route(require('./lib/routes'));

server.start( (err) => {
  if(err) { throw err; }
  console.log('Server running at ' + server.info.uri)
});
