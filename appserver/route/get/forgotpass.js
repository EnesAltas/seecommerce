var express = require('express');
var router = express.Router();
const fs = require('fs');

router
    .route("/resetpassword")
    .get(function(req,res){
        var shopconfig = JSON.parse(fs.readFileSync('./././shopconfig.json'));
        res.render('forgotpass',{
            head:"Forgot Pass",
            shopconfig: shopconfig
          })
});

module.exports = router;