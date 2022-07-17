var express = require('express');
const session = require('express-session');
var router = express.Router();
const fs = require('fs');


const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
}

router
    .route("/login")
    .get(ifLoggedin,function(req,res){
        var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
        if(!req.session.cart){
            req.session.cart = [];
        }
        if(req.header('Referer') != undefined){
            req.session.back = req.header('Referer')
        }
        res.render('login',{
            head:"Login",
            shopconfig: shopconfig
        });
});

module.exports = router;