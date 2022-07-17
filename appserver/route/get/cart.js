var express = require('express')
var router = express.Router();
var User = require('../../../models/dbmodels/user');
var Product = require('../../../models/dbmodels/product');
const fs = require('fs');

router.use(function(req,res,next){
    next();
});

router.get('/cart',function(req,res){
    if(!req.session.cart){
        req.session.cart = [];
    }
    User.findOne({userid:req.session.userID},async function(err,data){
        var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
        var productcategory;
        Product.find(async function(err,product){
            productcategory = product.map(x => x.productcategory)
        })
        if(data){
                
                ids = data.cart.map(x => x.productId)
    
                let products = await Product.find(
                    {'productid': { $in: ids}}
                );

                res.render('cart',{
                    head:'Cart',
                    sess:req.session,
                    user:data,
                    product:products,
                    productcategory:productcategory,
                    shopconfig:shopconfig
                });
        }else{
            res.render('cart',{
                head:'Cart',
                sess:req.session,
                productcategory:productcategory,
                shopconfig:shopconfig
            });
        }
    })
});

module.exports = router;