var express = require('express');
var router = express.Router();

router
    .route("/logout")
    .get(function(req,res){
        req.session.destroy(function(err){
            res.redirect('/login');
        });
});

module.exports = router;