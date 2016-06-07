var carrierModel = require("./carrier.js");
var Joi = require('joi');

var Routes =[{
		path: '/', 
		method: 'GET', 
		handler: function (request, reply) {
			return reply.file('./public/index.html');
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
		}
},
{		
		path: '/admin',
		method: 'GET',
		handler: function(request, reply){
			return reply({role: 'admin', inventory: true});
		}
},
{
		path: '/carriers',
		method: 'GET',
		handler: function(request, reply) {
			return reply('found? something?')
		}
},
{
  method: 'GET',
  path: '/api/v1/carriers',
  handler: function(request, reply) {

    carrierModel.find(function(err, carriers) {
      if (err) {
        reply(err);
        return;
      }

      reply(carriers);
    });
  }
},
{
  method: 'PUT',
  path: '/api/v1/carriers/{id}',
  handler: function(request, reply) {

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
  },
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
  handler: function(request, reply) {

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
  },
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