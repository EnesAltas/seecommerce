var express = require('express');
var router = express.Router();
var User = require('../../../models/dbmodels/user');
var Session = require('../../../models/dbmodels/session');
var bcrypt = require('bcrypt');
var saltRounds = 12;
var hashprefix = "ecommerce";

function comparepass(passnohash, passhash){
    return bcrypt.compareSync(`${hashprefix}${passnohash}`, passhash)
  }

function generateUUID(){
    var d = new Date().getTime();
  
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
    {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
  
  return uuid;
}

router
    .route("/userlogin")
    .post(function(req,res){
        User.findOne({username:req.body.username},async function(err,data){
          if(data){
          if(comparepass(req.body.password,data.password)){
            if(data.status != "Active"){
              res.send({"Success":"Email Verification Required!"})
            }
            else{
              var ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                if (ip.substr(0, 7) == "::ffff:") {
                    ip = ip.substr(7)
                }
              req.session.isLoggedIn = true;
              req.session.userID = data.userid;
              req.session.sessid = generateUUID();
              User.findOne({userid:req.session.userID},async function(err,veri){
                var cart = JSON.parse(req.body.items)

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

                veri.lastloginip = ip;
                veri.lastlogin = new Date();
                veri.save()
              });
              
              backController = function(){
                if(!req.session.back){
                  return '/'
                }else{
                  return req.session.back
                }
              }
              res.send({"Success":"Login successful!","redirect":"true","location":`${backController()}`});
              }
                }else{
            res.send({"Success":"Password or E-Mail Incorrect!"});
                }
          }
		  else{
            res.send({"Success":"Password or E-Mail Incorrect!"});
          }
        });
});

module.exports = router;