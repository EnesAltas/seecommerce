var express = require('express')
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var User = require('../../../models/dbmodels/user')
var Product = require('../../../models/dbmodels/product')

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router
    .route("/createproduct")
    .post(function(req,res){
        if(req.session.isLoggedIn){
            User.findOne({userid:req.session.userID},async function(err,data){
                var date = new Date();
                var productId = uuidv4()
                var url = `${req.body.nhead.replace(/\?/g, "-qm-")}-${Date.parse(date)}`
                var photos = [req.files].flatMap(Object.values)
                if(data && data.admin == 'Active'){
                    var product = new Product({
                        productid:productId,
                        producthead:req.body.nhead,
                        productinfo:req.body.ninfo,
                        productprice:req.body.nprice,
                        productstock:req.body.nstock,
                        productcategory:req.body.ncategory,
                        url: url
                      })
                      await product.save()
                      photos.forEach(async element => {
                            if(element != undefined){
                                var uuid = uuidv4()
                                var photo = element.mimetype;
                                if(photo!='image/png' && photo!='image/jpg' && photo!='image/jpeg'){
                                  return;

                                }else{
                                    var imagename = uuid
                                    var expansion = element.mimetype
                                    var exp = expansion.slice(6);
                                    await Product.findOneAndUpdate({productid:productId },
                                        {$push:{
                                        productimages:{
                                        'image':capitalize(`${imagename}.`+`${exp}`),
                                                }
                                            }    
                                        },
                                    {new: true}) 
                                    image = element;
                                    let uploadPath = './././public/img/' + capitalize(`${imagename}.`+`${exp}`);
                                    image.mv(uploadPath);
                                }
                            }
                        });
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