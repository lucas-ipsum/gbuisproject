const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definiert collection und schema
let BuisInfo = new Schema({
    name: {
      type: String
    },
    typ: {
      type: String
    },
    contact_name: {
      type: String
    },
    contact_mail: {
      type: String
    },
    contact_phone: {
      type: String
    },
    kosten: {
      type: Number
    },
    company: {
      type: String
    },
    website: {
        type: String
    },
    logo: {
      type: String
    },
    sonstiges: {
      type: String
    },
    info_text: {
      type: String
    }
  }, {
    collection: 'buis_info'
  });
  module.exports = mongoose.model('BuisInfo', BuisInfo);
