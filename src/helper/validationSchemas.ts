import joi from 'joi'

export default class ValidationSchemas {
  public login = joi.object().keys({
    password: joi.string().min(3).max(15).required(),
    email: joi.string().email().required()
  })

  public signup = joi.object().keys({
    firstName: joi.string().max(10).required(),
    lastName: joi.string().max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(15).required()
  })

  public genNewAccessToken = joi.object().keys({
    refreshToken: joi.string().required()
  })
}
