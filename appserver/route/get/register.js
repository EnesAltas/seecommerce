var express = require('express');
var router = express.Router();
const fs = require('fs');

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
}

router
    .route("/signup")
    .get(ifLoggedin,function(req,res){
        var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
        if(!req.session.cart){
            req.session.cart = [];
        }
        res.render('register',{
            head:"Signup",
            shopconfig: shopconfig
        });
});

module.exports = router;