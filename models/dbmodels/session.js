var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var sessionSchema = new Schema({}, { strict: false });

var Session = mongoose.model('Session',sessionSchema,'sessions');

module.exports = Session