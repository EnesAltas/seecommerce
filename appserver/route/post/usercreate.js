var express = require('express');
var router = express.Router();
var {authSchema} = require('../../../models/validatemodels/validate')
var User = require('../../../models/dbmodels/user');
var nodemailer = require('nodemailer');
var { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt');
var saltRounds = 12;
var hashprefix = "ecommerce";
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

function hashpass(passnohash){
  return bcrypt.hashSync(`${hashprefix}${passnohash}`, saltRounds)
}
  
function comparepass(passnohash, passhash){
  return bcrypt.compareSync(`${hashprefix}${passnohash}`, passhash)
}

router
    .route("/usercreate")
    .post(function(req,res){
        User.findOne({$or:[{email:req.body.email},{username:req.body.username}]}, async function(err,data){
          if(!data){
            console.log(req.body);
            const result = authSchema.validate({username:req.body.username,email:req.body.email,password:req.body.password,repeat_password:req.body.confirm_password})
            if(result.error){
              if(result.error.details[0].context.label === "repeat_password"){
                res.send({"Success":'Passwords Do Not Match!'})
              }
              else{
                res.send({"Success":`${result.error.details[0].context.label}`})
              }
            }else{
              var tokencreator = uuidv4();
              var user = new User({
                userid:uuidv4(),
                username:req.body.username,
                email:req.body.email,
                password:hashpass(req.body.password),
                token:tokencreator,
                registerdate:new Date(),
                lastlogin:new Date()
              })
              user.save()
              const maillink = `${req.protocol}://${req.get('host')}/confirmation/${tokencreator}`
              var mailOptions = {
                from: `${shopconfig.shopname} <${config.Email}>`,
                to: `${req.body.username} <${req.body.email}>`, 
                subject: 'Confirm Your Account',
                text: maillink
              };
              await transporter.sendMail(mailOptions);
              res.send({"Success":"Registration confirmed, mail confirmation required!"})
            }
          }
          else{
            if(req.body.username == data.username){
              res.send({"Success":"Username or E-Mail in Use!"})
            }
            else{
              res.send({"Success":"Username or E-Mail in Use!"})
            }
          }
        })
      });

module.exports = router;