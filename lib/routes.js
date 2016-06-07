var Mongoose = require('mongoose');
var Joi = require('joi');

Mongoose.connect('mongodb://localhost/handsfree');

var carrierSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  isCheckedOut: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

var Carrier = Mongoose.model('Carrier', carrierSchema, 'Carriers');

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

    Carrier.find(function(err, carriers) {
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

    Carrier.findOne({ _id: request.params.id }, function(err, carrier) {
      if (err) {
        reply(err);
        return;
      }

      carrier.name = request.payload.name;
      carrier.isCheckedOut = request.payload.isCheckedOut;
      carrier.updatedAt = new Date();
      carrier.save();

      reply(todo);
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

    var newCarrier = new Carrier({
      name: request.payload.name,
      isCheckedOut: request.payload.isCheckedOut,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    newCarrier.save(function(err, carrier) {
      if (err) {
        reply(err);
        return;
      }

      reply(carrier);
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