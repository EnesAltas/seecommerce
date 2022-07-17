var express = require('express')
var router = express.Router();
var User = require('../../../models/dbmodels/user')
var nodemailer = require('nodemailer');
const config = require("../../../config.json");
const shopconfig = require("../../../shopconfig.json");

var transporter = nodemailer.createTransport({
  host: "smtpout.europe.secureserver.net",
  secureConnection: true,
  port: 587,
  auth: {
      user: config.Email,
      pass: config.EmailPass
  },
});

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
    .route("/passgiver")
    .post(function(req,res){
      User.findOne({email:req.body.email},function(err,data){
        var tokencreator = generateUUID();
        if(data){
          data.passtoken = tokencreator;
          data.save()
          const maillink = `${req.protocol}://${req.get('host')}/passnew/${tokencreator}`
          var mailOptions = {
            from: `${shopconfig.shopname} <${config.Email}>`,
            to: `${data.username} <${data.email}>`,
            subject: 'Password Renewal Request',
            text: `We've received a request to reset your password, if you haven't done this, clicking or sharing the link could allow attackers to hijack your account:
            ${maillink}`
          };
          transporter.sendMail(mailOptions);
          res.send({"Success":"Renewal Link Sent To E-Mail!"});
        }
        else{
          res.send({"Success":"E-Mail Not Registered!"});
        }
        })
      });

module.exports = router;