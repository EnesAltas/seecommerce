var express = require('express')
var router = express.Router();
var Product = require('../../../models/dbmodels/product');
const fs = require('fs');

router.use(function(req,res,next){
    next();
});

router.get('/product/:url',async function(req,res){
    if(!req.session.cart){
        req.session.cart = [];
    }
        Product.find(async function(err,products){
            var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
            var productcategory;
            productcategory = products.map(x => x.productcategory)
            var product = products.find(x => x.url === req.params.url)
            if(product){
                res.render('product',{
                    head:'Product',
                    sess: req.session,
                    product: product,
                    productcategory:productcategory,
                    shopconfig:shopconfig
                });
            }else{
                res.render('404',{
                    head:'404',
                });
            }
        })
});

module.exports = router;