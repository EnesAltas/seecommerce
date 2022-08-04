var express = require('express')
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')
var Event = require('../../../models/dbmodels/event')

router
    .route("/createevent")
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

                    if(!req.body.itemall){
                        var event = new Event({
                            eventhead: req.body.eventhead,
                            eventdescription: req.body.eventdescription,
                            eventdiscount: req.body.eventdiscount,
                            eventenddate: req.body.eventdate,
                            products: req.body.products
                        });

                        await event.save()
                    }else{
                        await Product.find(async function(err,product){
                            var products;
                            products = product.map(x => x.productid)
                            
                            var event = new Event({
                                eventhead: req.body.eventhead,
                                eventdescription: req.body.eventdescription,
                                eventdiscount: req.body.eventdiscount,
                                eventenddate: req.body.eventdate,
                                products: products
                            });

                            await event.save()
                        }).clone()
                        
                    }

                    await Event.find(async function(err,event){
                        if(req.body.itemall){
                            await Product.find(async function(err,product){
                                var products;
                                products = product.map(x => x.productid)

                                products.forEach(product => {
                                    Product.findOne({productid:product},async function(err,data){
                                        data.productdiscount = req.body.eventdiscount
                                        await data.save()
                                    })
                                })

                            }).clone()
                        }else{
                            event[0].products.forEach(product => {
                                Product.findOne({productid:product},async function(err,data){
                                    data.productdiscount = req.body.eventdiscount
                                    await data.save()
                                })
                            });
                        }

                    }).clone()

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