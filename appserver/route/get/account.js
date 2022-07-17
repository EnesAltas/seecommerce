var express = require('express')
var router = express.Router();
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')
const fs = require('fs');

const ifLoggedin = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    next();
}

router.use(function(req,res,next){
    next();
});

router.get('/account',ifLoggedin,function(req,res){
    
    if(!req.session.cart){
        req.session.cart = [];
    }

    User.findOne({userid:req.session.userID},async function(err,data){
        var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
        if(data){
            if(data.admin == 'Active'){
                var productcategory;
                Product.find(function(err,product){
                    productcategory = product.map(x => x.productcategory)
                    res.render('adminaccount',{
                        head:'Account',
                        sess: req.session,
                        user: data,
                        productcategory: productcategory,
                        shopconfig: shopconfig
                    });
                })
            }else{
                Product.find(function(err,product){
                    productcategory = product.map(x => x.productcategory)
                    res.render('account',{
                        head:'Account',
                        sess: req.session,
                        user: data,
                        productcategory: productcategory,
                        shopconfig: shopconfig
                    });
                })
            }
        }
    })

});

module.exports = router;