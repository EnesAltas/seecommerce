var express = require('express')
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')

router
    .route("/updateproduct")
    .post(function(req,res){
        if(req.session.isLoggedIn){
            User.findOne({userid:req.session.userID},async function(err,data){
                if(data && data.admin == 'Active'){
                    Product.findOne({productid:req.body.productid},async function(err,product){

                        var date = new Date();
                        var url = `${req.body.nhead.replace(/\?/g, "-qm-")}-${Date.parse(date)}`
                        
                        product.producthead = req.body.nhead
                        product.productprice = Number(req.body.nprice)
                        product.productstock = Number(req.body.nstock)
                        product.productinfo = req.body.ninfo
                        product.productcategory = req.body.ncategory
                        product.url = url

                        await product.save()

                        res.send({"Status":"OK"});
                    })
                }else{
                    res.send({"Denied":"Invalid code!"});
                }
            });
        }else{
            res.send({"Denied":"Invalid code!"});
        }
    });

module.exports = router;