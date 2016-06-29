var Joi = require('joi');
var Handlers = require('./handlers.js');

var Routes =[{
	path: '/',
	method: 'GET',
	handler: function (request, reply) {
		return reply.file('./public/index.html');
	},
	config: {
		auth: false
	}
},
{
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
},
{
	path: '/login',
	method: 'GET',
	handler: function(request, reply){
		return reply.view('login');
	},
	config: {
		auth: false
	}
},
{
	path: '/login',
	method: 'POST',
	handler: Handlers.loginHandler,
		config: {
			auth: false
		}
},
{
	path: '/register',
	method: 'GET',
	handler: function(request, reply){
		return reply.view('register');
	},
	config: {
		auth: false
	}
},
{
	path: '/register',
	method: 'POST',
	handler: Handlers.registerHandler,
	config: {
		auth: false
	}
},
{
	path: '/admin',
	method: 'GET',
	config: {
		auth: {
			strategy: 'base'
		},
		handler: function(request, reply){
	 		return reply.view('admin', {user:request.auth.credentials});
		}
	}
},
{
	path: '/logout',
	method: 'GET',
	handler: Handlers.logoutHandler
},
{
  method: 'GET',
  path: '/api/v1/carriers',
  handler: Handlers.getCarriers
},
{
  method: 'PUT',
  path: '/api/v1/carriers/{id}',
  handler: Handlers.updateCarrier,
  config: {
    validate: {
      params: {
        id: Joi.string().required()
      },
      payload: {
        _id: Joi.string(),
        __v: Joi.number(),
        name: Joi.string(),
        isCheckedOut: Joi.boolean(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
      }
    }
  }
},
{
  method: 'POST',
  path: '/api/v1/carriers',
  handler: Handlers.createCarrier,
  config: {
    validate: {
      payload: {
        name: Joi.string(),
        isCheckedOut: Joi.boolean(),
      }
    }
  }
}];

module.exports = Routes;
