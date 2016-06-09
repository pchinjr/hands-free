var bcrypt = require('bcrypt');
var Boom = require('boom');
var Joi = require('joi');
var UserStore = require('./userStore');

var Handlers = {};

var loginSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().max(32).required()
});

Handlers.loginHandler = function(request, reply) {
	Joi.validate(request.payload, loginSchema, function(err, val) {
		if(err) {
			return reply(Boom.unauthorized('Credentials did not validate'));
		}
		UserStore.validateUser(val.email, val.password, function(err, user) {
			if(err) {
				return reply(err);
			}
			request.cookieAuth.set(user);
			reply.redirect('/admin');
		});
	});
};

Handlers.logoutHandler = function(request, reply) {
	request.cookieAuth.clear();
	reply.redirect('/');
};

module.exports = Handlers;