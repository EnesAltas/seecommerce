var express = require('express')
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
const fs = require('fs');
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router
    .route("/productimageupdate")
    .post(function(req,res){
        if(req.session.isLoggedIn){
            User.findOne({userid:req.session.userID},async function(err,data){
                if(data && data.admin == 'Active'){
                        
                    var photos = [req.files].flatMap(Object.values)
                    
                    for (let i = 0; i < photos.length; i++) {

                        var image = photos[i]
                        var imagename = uuidv4()
                        var expansion = image.mimetype
                        var exp = expansion.slice(6);

                        await Product.findOneAndUpdate({productid:req.body.productid },
                            {$push:{
                            productimages:{
                            'image':capitalize(`${imagename}.`+`${exp}`),
                                    }
                                }    
                            },
                        {new: true}) 
                        
                        let uploadPath = './././public/img/' + capitalize(`${imagename}.`+`${exp}`);
                        image.mv(uploadPath);

                      }
                    
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