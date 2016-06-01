var Routes =[{
		path: '/hello', 
		method: 'GET',
		handler: function (request, reply) {
			reply.file('./public/hello.html');
		}
}, 
{
		path: '/', 
		method: 'GET', 
		handler: function (request, reply) {
			return reply.file('./public/index.html');
		}
}, 
{
		path: '/{name}', 
		method: 'GET', 
		handler: function (request, reply) {
			console.log(request.params);
			return reply('Hello ' + encodeURIComponent(request.params.name) + '!');
		}
}, 
{
		path: '/public/{path*}',
		method: 'GET', 
		handler: {
			directory: {
				path: './public'
				, listing: false
			}
		}, 
		config: {
			auth: false
		}
},
{		
		path: '/admin',
		method: 'GET',
		handler: function(request, reply){
			return reply('Hi This is the Admin Page');
		}
}];

module.exports = Routes;