var Mongoose = require('mongoose');


Mongoose.connect('mongodb://localhost/newtest');

var todoSchema = new Mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

var Todo = Mongoose.model('Todo', todoSchema, 'Todos');

exports.Mongoose = Mongoose;



exports.todoSchema = todoSchema;

exports.Todo = Todo;