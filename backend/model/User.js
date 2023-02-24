const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Definiert collection und schema
let User = new Schema({
  herstellername: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  rolle: {
    type: String,
    require: true
  }
}, {
  collection: 'user'
});

module.exports = mongoose.model('User', User);
