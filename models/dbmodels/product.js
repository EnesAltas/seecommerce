var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productid:String,
    producthead:String,
    productprice:Number,
    productstock:Number,
    productinfo:String,
    productcategory:String,
    productdiscount:Number,
    url:String,
    productimages:[{image:String,_id:false}],
})

var Product = mongoose.model('Product',productSchema)

module.exports = Product