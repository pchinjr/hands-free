var bcrypt = require('bcrypt');
var Boom = require('boom');
var userModel = require('./user.js');

var UserStore = {};

UserStore.users = {'dude@aol.com':
   { name: 'dude',
     email: 'dude@aol.com',
     passwordHash: '$2a$10$BDGsiluNl/ULbEsMZgwYIeOTErjNBjvD8n2afXzapEMMesTIw.9l.' }};

// UserStore.initialize = function() {
// 	UserStore.createUser('admin', 'admin@gmail.com', 'admin');
// 	UserStore.createUser('Paul', 'pchinjr@gmail.com', 'password');
// };

UserStore.createUser = function(name, email, password, callback) {

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {

			var user = {
				name: name,
				email: email,
				passwordHash: hash
			};

			if(UserStore.users[email]) {
				callback(Boom.conflict('Email already exists. Please login.'));
			} else {
				// var newCarrier = new carrierModel({
				// 	name: request.payload.name,
				// 	isCheckedOut: request.payload.isCheckedOut,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date()
				// });
				// newCarrier.save(function(err, Carrier) {
				// 	if (err) {
				// 		reply(err);
				// 		return;
				// 	}
				// 	reply(Carrier);
				// });

				UserStore.users[email] = user;
				console.log(user);
				console.log(UserStore.users);
				if(callback) callback();
			}
		});
	});
};

UserStore.validateUser = function(email, password, callback) {
	var user = UserStore.users[email];
	if(!user) {
		callback(Boom.notFound('User does not exist.'));
		return;
	}
	console.log(user);
	bcrypt.compare(password, user.passwordHash, function(err, isValid) {
		if(!isValid) {
			callback(Boom.unauthorized('Password does not match.'));
		} else {
			callback(null, user);
		}
	});
}

module.exports = UserStore;
