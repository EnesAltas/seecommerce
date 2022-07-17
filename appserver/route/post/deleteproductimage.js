var express = require('express')
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
const fs = require('fs');
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')

router
    .route("/deleteproductimage")
    .post(function(req,res){
        if(req.session.isLoggedIn){
            User.findOne({userid:req.session.userID},async function(err,data){
                if(data && data.admin == 'Active'){
                        
                        let uploadPath = './././public/img/' + req.body.image
                        
                        if(fs.existsSync(uploadPath)){
                            fs.unlinkSync(uploadPath);
                        }

                        await Product.findOneAndUpdate({'productimages.image':req.body.image},
                            {$pull:{
                            productimages:{
                                image:req.body.image
                                    }
                                }    
                            })

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