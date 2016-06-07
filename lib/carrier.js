var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

// define carrier schema
var carrierSchema = new Schema({
  name: { type: String, required: true },
  isCheckedOut: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

// export 'carrier' model
module.exports = Mongoose.model('Carrier', carrierSchema);