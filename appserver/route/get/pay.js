var express = require('express')
var router = express.Router();
var User = require('../../../models/dbmodels/user');
var Product = require('../../../models/dbmodels/product');
const fs = require('fs');

const ifLoggedin = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    next();
}

router.get('/pay',ifLoggedin,function(req,res){
    User.findOne({userid:req.session.userID},async function(err,data){
        var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
        var productcategory;
        Product.findOne({userid:req.session.userID},async function(err,product){
            productcategory = product.map(x => x.productcategory)
        })

            ids = data.cart.map(x => x.productId)
            qty = data.cart.map(x => x.qty)
            
            let products = await Product.find(
                {'productid': {$in: ids}}
            );

            prod = products.map(x => x.productprice)

            total = prod.reduce((x,y,z) => {
                return x+y*qty[z]
            },0)

            res.render('pay',{
                head:'Pay',
                sess:req.session,
                user:data,
                total:total,
                productcategory:productcategory,
                shopconfig:shopconfig
            })

    });

});

module.exports = router;