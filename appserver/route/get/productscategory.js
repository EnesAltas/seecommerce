var express = require('express')
var router = express.Router();
var Product = require('../../../models/dbmodels/product');
const fs = require('fs');
var util = require('util');

router.use(function(req,res,next){
    next();
});

router.get('/products/:category',function(req,res){
    var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
    
    if(!req.session.cart){
        req.session.cart = [];
    }

    if(req.params.category == 'allproducts'){
        Product.find(function(err,product){
            var productcategory;
            productcategory = product.map(x => x.productcategory)
            res.render('allproducts',{
                head:'All Products',
                sess: req.session,
                product: product,
                productcategory:productcategory,
                shopconfig:shopconfig
            });
        })
    }else{

        Product.find(function(err,products){
            var productcategory;
            productcategory = products.map(x => x.productcategory)
            var product = products.filter(x => x.productcategory == req.params.category)
            
            if(product.length == 0){
                res.render('404',{
                    head:'404'
                });
                return;
            }

            if(!util.isArray(product)){
               product = [product] 
            }
            res.render('allproducts',{
                head:'All '+req.params.category,
                sess: req.session,
                product: product,
                productcategory:productcategory,
                shopconfig:shopconfig
            });
        })
    }
});

module.exports = router;