var bcrypt = require('bcrypt');
var Boom = require('boom');
var Joi = require('joi');
var UserStore = require('./userStore');
var carrierModel = require('./carrier.js');
var userModel = require('./user.js');

var Handlers = {};

//Joi Validations
var loginSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().max(32).required()
});

var registerSchema = Joi.object().keys({
	name: Joi.string().max(50).required(),
	email: Joi.string().email().required(),
	password: Joi.string().max(32).required()
});

//User Handlers
Handlers.registerHandler = function(request, reply) {
	Joi.validate(request.payload, registerSchema, function(err, val) {
		if(err) {
			return reply(Boom.unauthorized('Credentials did not validate'));
		}
		UserStore.createUser(val.name, val.email, val.password, function(err) {
			if(err) {
				return reply(err);
			}
			reply.view('login');
		});
	});
};

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

			// carrierModel.find(function(err, carriers) {
			// 	if (err) {
			// 		reply(err);
			// 		return;
			// 	}
			// 	reply(carriers);
			// });
			reply.view('admin', {user: user});
		});
	});
};

Handlers.logoutHandler = function(request, reply) {
	request.cookieAuth.clear();
	reply.redirect('/');
};


//Carrier Handlers
Handlers.getCarriers = function(request, reply) {
	carrierModel.find(function(err, carriers) {
		if (err) {
			reply(err);
			return;
		}
		reply(carriers);
	});
};

Handlers.updateCarrier = function(request, reply) {

	carrierModel.findOne({ _id: request.params.id }, function(err, Carrier) {
		if (err) {
			reply(err);
			return;
		}

		Carrier.name = request.payload.name;
		Carrier.isCheckedOut = request.payload.isCheckedOut;
		Carrier.updatedAt = new Date();
		Carrier.save();

		reply(Carrier);
	});
};

Handlers.createCarrier = function(request, reply) {
	var newCarrier = new carrierModel({
		name: request.payload.name,
		isCheckedOut: request.payload.isCheckedOut,
		createdAt: new Date(),
		updatedAt: new Date()
	});
	newCarrier.save(function(err, Carrier) {
		if (err) {
			reply(err);
			return;
		}
		reply(Carrier);
	});
}

module.exports = Handlers;
