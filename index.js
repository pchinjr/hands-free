'use strict';

var Hapi = require('hapi');
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

var server = new Hapi.Server(); 

server.connection({
  host: 'localhost',
  port: 8080,  
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
      reply({message: 'this is the home page', code: 'hahahaha'});
  }
});

server.route({
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
});

server.route({
  method: 'GET',
  path: '/api/v1/todos/{id}',
  handler: function(request, reply) {

    Todo.find({ _id: request.params.id }, function(err, todo) {
      if (err) {
        reply(err);
        return;
      }

      reply(todo);
    });

  },
  config: {
    validate: {
      params: {
        id: Joi.string().required()
      }
    }
  }
});

server.route({
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
});

server.route({
  method: 'POST',
  path: '/api/v1/todos',
  handler: function(request, reply) {

    var newTodo = new Todo({
      title: request.payload.title,
      isCompleted: request.payload.isCompleted,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    newTodo.save(function(err, todo) {
      if (err) {
        reply(err);
        return;
      }

      reply(todo);
    });
  },
  config: {
    validate: {
      payload: {
        title: Joi.string(),
        isCompleted: Joi.boolean(),
      }
    }
  }
});

server.route({
  method: 'DELETE',
  path: '/api/v1/todos/{id}',
  handler: function(request, reply) {

    Todo.findByIdAndRemove(request.params.id, function(err, todo) {
      if (err) {
        reply(err);
        return;
      }

      reply(todo);
    });
  },
  config: {
    validate: {
      params: {
        id: Joi.string().required()
      }
    }
  }
});

server.start( (err) => {
  if(err) { throw err; }
  console.log('Server running at ' + server.info.uri)
});


