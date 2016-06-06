var Mongoose = require('mongoose');
var Joi = require('joi');

Mongoose.connect('mongodb://localhost/newtest');

var todoSchema = new Mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

var Todo = Mongoose.model('Todo', todoSchema, 'Todos');

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
  path: '/api/v1/todos',
  handler: function(request, reply) {

    Todo.find(function(err, todos) {
      if (err) {
        reply(err);
        return;
      }

      reply(todos);
    });
  }
},
{
  method: 'PUT',
  path: '/api/v1/todos/{id}',
  handler: function(request, reply) {

    Todo.findOne({ _id: request.params.id }, function(err, todo) {
      if (err) {
        reply(err);
        return;
      }

      todo.title = request.payload.title;
      todo.isCompleted = request.payload.isCompleted;
      todo.updatedAt = new Date();
      todo.save();

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
        title: Joi.string(),
        isCompleted: Joi.boolean(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
      }
    }
  }
}];

module.exports = Routes;