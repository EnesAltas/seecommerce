var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    eventhead:String,
    eventdescription:String,
    eventdiscount:Number,
    eventenddate:String,
    products:[{}],
})

var Event = mongoose.model('Event',eventSchema)

module.exports = Event