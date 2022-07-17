var express = require('express')
var router = express.Router();
var Product = require('../../../models/dbmodels/product')

router
    .route("/search")
    .post(async function(req,res){
            Product.find({producthead: new RegExp(req.body.product, "i")},{"_id":0,"producthead":1,"url":1}).lean().exec(function(err,data){
                
                if(data.length != 0){
                    res.send({'Status':'OK','Data':JSON.stringify(data)})
                }else{
                    res.send({'Status':'OK','Data':'Not Found'})
                }

            })
            
    });

module.exports = router;