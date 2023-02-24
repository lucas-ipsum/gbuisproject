const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definiert collection und schema
let BuisMK = new Schema({
  name: {
    type: String
  },
  mkKriterien: {
    type: [String]
  }
}, {
  collection: 'buis_mk'
});
module.exports = mongoose.model('BuisMK', BuisMK);