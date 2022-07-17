var express = require('express')
var router = express.Router();
const fs = require('fs');
var User = require('../../../models/dbmodels/user')
var { v4: uuidv4 } = require('uuid');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router
    .route("/shopsettings")
    .post(function(req,res){
        User.findOne({userid:req.session.userID},async function(err,data){
            if(data && data.admin == 'Active'){
                var data = JSON.parse(fs.readFileSync('./././shopconfig.json'));

                if(req.body.control === 'bannerRemove'){
                    let uploadPath = './././public/img/shop/' + req.body.bannerid
                    if(fs.existsSync(uploadPath)){
                        fs.unlinkSync(uploadPath);
                    }

                    var banner = data.shopbannerimages.find(banner => banner.imagen === req.body.bannerid);
                    
                    if(banner){
                        data.shopbannerimages.splice(data.shopbannerimages.findIndex(banner => banner.imagen === req.body.bannerid),1);
                    }

                    fs.writeFileSync('./././shopconfig.json', JSON.stringify(data, null, 4));
                    
                    res.send({"Status":"OK"});
                    return;
                }

                if(req.body.control === 'bannerAdd'){

                    var photos = [req.files].flatMap(Object.values)
                    
                    for (let i = 0; i < photos.length; i++) {

                        var image =  photos[i]
                        var imagename = uuidv4()
                        var expansion = image.mimetype
                        var exp = expansion.slice(6);
                        var imagen = capitalize(`${imagename}.`+`${exp}`)
                        
                        let uploadPath = './././public/img/shop/' + capitalize(`${imagename}.`+`${exp}`);
                        image.mv(uploadPath);

                        data.shopbannerimages.push({
                            imagen
                        })
                        
                      }

                    fs.writeFileSync('./././shopconfig.json', JSON.stringify(data, null, 4));
                    
                    res.send({"Status":"OK"});
                    return;
                }

                if(req.files != null){
                    if(req.files.shopthumbnail){

                        var image = req.files.shopthumbnail
                        var imagename = 'shopthumbnail'
                        var expansion = image.mimetype
                        var exp = expansion.slice(6);
                        
                        data.shopthumbnail = capitalize(`${imagename}.`+`${exp}`)
                        
                        fs.writeFileSync('./././shopconfig.json', JSON.stringify(data, null, 4));
                        let uploadPath = './././public/img/shop/' + capitalize(`${imagename}.`+`${exp}`);
                        image.mv(uploadPath);
                    }
                }

                data.shopname = req.body.shopname
                data.shopdomain = req.body.shopdomain
                data.shopmail = req.body.shopmail
                data.shopphone = req.body.shopphone
                data.shopcurrency = req.body.shopcurrency
                data.shopabout = req.body.shopabout

                fs.writeFileSync('./././shopconfig.json', JSON.stringify(data, null, 4));

                res.send({"Status":"OK"});
            }else{
                res.send({"Denied":"Invalid code!"});
            }  
        })
    });

module.exports = router;