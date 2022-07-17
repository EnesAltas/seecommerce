var express = require('express');
var router = express.Router();
var User = require('../../../models/dbmodels/user');
const fs = require('fs');

router
    .route("/passnew/:token")
    .get(function(req,res){
        User.findOne({passtoken:req.params.token},function(err,data){
          var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
            if(data){
              res.render('passnew',{
                passtoken:data.passtoken,
                head:"Reset Your Pass",
                shopconfig: shopconfig
              })
            }else{
            res.send({"Denied":"Access Denied!"});
            res.end();
            }
        });
});

module.exports = router;