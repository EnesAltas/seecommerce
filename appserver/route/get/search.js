var express = require('express')
var router = express.Router();
var Product = require('../../../models/dbmodels/product');
const fs = require('fs');
var util = require('util');

router.use(function(req,res,next){
    next();
});

router.get('/search/:search',function(req,res){
    var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
    
    if(!req.session.cart){
        req.session.cart = [];
    }

    Product.find(function(err,product){
        Product.find({producthead: new RegExp(req.params.search, "i")},{"_id":0,"producthead":1,"url":1,"productprice":1,"productimages":1}).lean().exec(function(err,data){
                var productcategory;
                productcategory = product.map(x => x.productcategory)
                    res.render('allproducts',{
                    head:'Search '+req.params.search,
                    sess: req.session,
                    product: data,
                    productcategory:productcategory,
                    shopconfig:shopconfig
                });

        })
    })

});

module.exports = router;