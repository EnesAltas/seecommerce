var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userid:String,
    username:String,
    email:String,
    password:String,
    registerdate:String,
    token:String,
    passtoken:String,
    cart:[{productId:String,qty:Number,_id:false}],
    admin: {
      type: String, 
      enum: ['Passive', 'Active'],
      default: 'Passive'
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active', 'Banned'],
        default: 'Pending'
    },
    lastlogin:{
      type: String, 
      default: 'TBD'
    },
    lastloginip:{
      type: String, 
      default: 'TBD'
    },
})

var User = mongoose.model('User',userSchema)

module.exports = User