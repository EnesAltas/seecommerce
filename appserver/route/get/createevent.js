var express = require('express')
var router = express.Router();
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')
var Event = require('../../../models/dbmodels/event')
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

router.get('/createevent',ifLoggedin,function(req,res){
    
    if(!req.session.cart){
        req.session.cart = [];
    }

    User.findOne({userid:req.session.userID},async function(err,data){
        var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
        if(data.admin == 'Active'){
            Product.find(function(err,product){
                Event.find(function(err,event){
                    var productcategory;
                    productcategory = product.map(x => x.productcategory)
                    res.render('createEvent',{
                        head:'Create Event',
                        sess: req.session,
                        user: data,
                        product: product,
                        event:event[0],
                        productcategory:productcategory,
                        shopconfig:shopconfig
                    });
                })
            })
        }else{
            res.redirect('/account')
        }
    })

});

module.exports = router;