import Joi from 'joi'

class ValidationSchemas {
  static login = {
    body: Joi.object().keys({
      password: Joi.string().min(3).max(15).required(),
      email: Joi.string().email().required()
    })
  }

  static signup = {
    body: Joi.object().keys({
      firstName: Joi.string().max(10).required(),
      lastName: Joi.string().max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(15).required()
    })
  }

  static genNewAccessToken = {
    body: Joi.object().keys({
      refreshToken: Joi.string().required()
    })
  }
}

export default ValidationSchemas
