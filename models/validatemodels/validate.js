const Joi = require('joi');

const authSchema = Joi.object({
  username: Joi.string()
  .alphanum()
  .min(6)
  .max(12)
  .required()
  .label("Your Username can contain a minimum of 6 characters and a maximum of 12 characters."),
  
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$'))
    .required()
    .label("Your password must contain a minimum of 6 characters; must contain a capital letter; must contain a number."),

  repeat_password: Joi.ref('password'),

  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .label("Invalid Email.")
})
.with('password', 'repeat_password');

module.exports = {authSchema}