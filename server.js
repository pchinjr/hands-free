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

server.route({
		path:'/hello',
		method: 'GET',
		handler: function(request, reply) {
				reply.file('./public/hello.html');
		}
	});

server.route({
  path: '/',
  method: 'GET',
  handler: function(request, reply) {
    return reply.file('./public/index.html');
 	}
});

server.route({
	path: '/{name}',
	method: 'GET',
	handler: function(request, reply) {
	  console.log(request.params);
		return reply('Hello ' + encodeURIComponent(request.params.name) + '!');
	}
});

server.route({
	path: '/public/{path*}',
	method: 'GET',
	handler: {
		directory: {
			path: './public',
			listing: false
		}
	},
	config: {
		auth: false
	}
});

server.start( (err) => {
  if(err) { throw err; }
  console.log('Server running at ' + server.info.uri)
});
