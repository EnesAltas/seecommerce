var express = require('express')
var router = express.Router();
var User = require('../../../models/dbmodels/user')

router
    .route("/confirmation/:token")
    .get(function(req,res){
        User.findOne({token:req.params.token},function(err,data){
            if(data){
          data.status= "Active";
          data.token=undefined;
          data.save()
          res.redirect("/login")
          res.end();
            }else{
          res.send({"Denied":"Invalid code!"});
          res.end();
            }
        });
    });

module.exports = router;