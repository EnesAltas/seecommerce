var express = require('express')
var router = express.Router();
var {passSchema} = require('../../../models/validatemodels/passvalidate')
var User = require('../../../models/dbmodels/user')
var Session = require('../../../models/dbmodels/session')
var bcrypt = require('bcrypt');
var saltRounds = 12;
var hashprefix = "ecommerce";

function hashpass(passnohash){
    return bcrypt.hashSync(`${hashprefix}${passnohash}`, saltRounds)
  }
  

function comparepass(passnohash, passhash){
    return bcrypt.compareSync(`${hashprefix}${passnohash}`, passhash)
  }

router
    .route("/userchangepass")
    .post(function(req,res){
      Session.findOne({"session.sessid":req.session.sessid},function(err,bigdata){
        var veri = JSON.stringify(bigdata)
        var ver = JSON.parse(veri)
        User.findOne({userid:ver.session.userID},function(err,data){
            if(data){
              if(req.body.password != data.username){
                if(!comparepass(req.body.oldpassword,data.password)){
                  res.send({"Success":"Password Reset Failed, Your Old Password Is Incorrect!"});
                }
                else{
                  if(!comparepass(req.body.password,data.password)){
                    const result = passSchema.validate({password:req.body.password,repeat_password:req.body.confirmation})
                    if(result.error){
                      if(result.error.details[0].context.label === "repeat_password"){
                        res.send({"Success":'Passwords Do Not Match!'})
                      }
                      else{
                        res.send({"Success":`${result.error.details[0].context.label}`})
                      }
                    }
                    else{
                      data.password = hashpass(req.body.password);
                      data.save();
                      res.send({"Success":"Password Reset Successful!","Reload":"True"});
                    }
                  }
                  else{
                    res.send({"Success":"Your new password cannot be the same as your old password!"});
                  }
                }
              }
              else{
                res.send({"Success":"Your password cannot be the same as your username!","redirect":"false"});
              }
            }
            else{
              res.send({"Denied":"Invalid Session!"});
            }
          })
        })
      });

router
      .route("/passnewer")
      .post(function(req,res){
        User.findOne({passtoken:req.body.token},function(err,data){
            if(data){
              if(req.body.password != data.username){
                if(comparepass(req.body.password,data.password)){
                  res.send({"Success":"Your new password cannot be the same as your old password!","redirect":"false"});
                }
                else{
                  if(!comparepass(req.body.password,data.password)){
                    const result = passSchema.validate({password:req.body.password,repeat_password:req.body.confirm_password})
                    if(result.error){
                      if(result.error.details[0].context.label === "repeat_password"){
                        res.send({"Success":'Passwords Do Not Match!'})
                      }
                      else{
                        res.send({"Success":`${result.error.details[0].context.label}`})
                      }
                    }
                    else{
                      User.findOne({passtoken:req.body.token},function(err,veri){
                        veri.passtoken = undefined;
                        veri.password = hashpass(req.body.password);
                        veri.save();
                      });
                      res.send({"Success":"Password Reset Successful!","redirect":"true"});
                    }
                  }
                }
              }
              else{
                res.send({"Success":"Your password cannot be the same as your username!","redirect":"false"});
              }
            }
            else{
              res.send({"Denied":"Invalid code!"});
            }
          })
        });

module.exports = router;