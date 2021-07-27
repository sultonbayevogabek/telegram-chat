const Joi = require('joi')

module.exports = Joi.object({
   email: Joi.string()
      .required()
      .email({
         minDomainSegments: 2,
         tlds: { allow: ['com', 'net', 'ru', 'uz'] }
      })
      .error(Error('Incorrect email entered. Email example: example@gmail.com')),
   password: Joi.string()
      .required()
      .min(3)
      .error(Error('Password length must be at least 6 characters'))
})
