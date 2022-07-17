var express = require('express')
var router = express.Router();
var Product = require('../../../models/dbmodels/product');
const fs = require('fs');

router.use(function(req,res,next){
    next();
});

router.get('/',function(req,res){
    var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
    if(!req.session.cart){
        req.session.cart = [];
    }
    Product.find(function(err,product){
        productcategory = product.map(x => x.productcategory)
        res.render('index',{
            head:'Home',
            sess: req.session,
            product: product,
            productcategory:productcategory,
            shopconfig:shopconfig
        });
    })
});

module.exports = router;