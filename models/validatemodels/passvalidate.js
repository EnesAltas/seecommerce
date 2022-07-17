const Joi = require('joi');

const passSchema = Joi.object({

  password: Joi.string()
    .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$'))
    .required()
    .label("Your password must contain a minimum of 6 characters; must contain a capital letter; must contain a number."),

  repeat_password: Joi.ref('password'),
})
.with('password', 'repeat_password');

module.exports = {passSchema}