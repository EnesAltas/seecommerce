var express = require('express')
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
const fs = require('fs');
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')

router
    .route("/deleteproduct")
    .post(function(req,res){
        if(req.session.isLoggedIn){
            User.findOne({userid:req.session.userID},async function(err,data){
                if(data && data.admin == 'Active'){
                    Product.findOne({productid:req.body.productid},function(err,product){
                        product.productimages.forEach(element => {
                            let uploadPath = './././public/img/' + element.image
                            if(fs.existsSync(uploadPath)){
                                fs.unlinkSync(uploadPath);
                            }
                        });
                    })
                    Product.findOneAndDelete({productid:req.body.productid},function(){
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