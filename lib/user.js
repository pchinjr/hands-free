var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

// define user schema
var userSchema = new Schema({
  name: { type: String, required: true },
  email: {type: String, require: true},
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

// export 'user' model
module.exports = Mongoose.model('User', userSchema);
