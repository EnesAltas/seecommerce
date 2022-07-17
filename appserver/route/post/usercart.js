var express = require('express')
var router = express.Router();
var User = require('../../../models/dbmodels/user')

router
    .route("/cartupdate")
    .post(function(req,res){
        if(req.session.isLoggedIn){
            User.findOne({userid:req.session.userID},async function(err,data){
                var cart = JSON.parse(req.body.items)
                if(data){
                        await User.findOneAndUpdate({userid: data.userid},{$set:{cart: []}},{multi:true}) 
        
                        cart.forEach(async element => {
                            await User.findOneAndUpdate({userid: data.userid}, 
                                {$push:{
                                cart:{
                                'productId':element.id,
                                'qty': element.quantity
                                        }
                                    }    
                                },
                                {multi:true})     
                        });

                        req.session.cart = cart
                        
                        res.send({"Status":"OK"});
                }else{
                    res.send({"Denied":"Invalid code!"});
                }
                });
        }else{
            var cart = JSON.parse(req.body.items)
            req.session.cart = cart
            res.send({"Status":"OK"});
        }
    });

module.exports = router;