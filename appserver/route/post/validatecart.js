var express = require('express')
var router = express.Router();
var Product = require('../../../models/dbmodels/product')

router
    .route("/validatecart")
    .post(async function(req,res){
            ids = JSON.parse(req.body.cart)

            let products = await Product.find(
                {'productid': { $in: ids}}
            );
            
            res.send({'Status':'OK','Data':JSON.stringify(products)})
    });

module.exports = router;