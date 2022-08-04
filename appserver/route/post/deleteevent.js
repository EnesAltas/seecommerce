var express = require('express')
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')
var Event = require('../../../models/dbmodels/event')

router
    .route("/deleteevent")
    .post(function(req,res){
        if(req.session.isLoggedIn){
            User.findOne({userid:req.session.userID},async function(err,data){
                if(data && data.admin == 'Active'){
                    await Event.find(async function(err,event){
                        if(event.length != 0){
                            event[0].products.forEach(product => {
                                Product.findOne({productid:product},async function(err,data){
                                    data.productdiscount = 0
                                    data.save()
                                })
                            });
                        }
                    }).clone()

                    await Event.deleteMany({})

                    res.send({"Status":"OK"});
                }else{
                    res.send({"Denied":"Invalid code!"});
                }
                });
        }else{
            res.send({"Denied":"Invalid code!"});
        }
    });

module.exports = router;