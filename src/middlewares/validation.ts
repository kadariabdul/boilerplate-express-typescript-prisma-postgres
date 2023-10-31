import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { pick } from 'lodash'

export default (schema: object | Array<object>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object, { abortEarly: false })

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message.replace(/["\\]/g, ''))
      return res.status(400).json({
        message: 'Validation Error',
        statusCode: 400,
        status: false,
        data: errorMessages
      })
    }
    Object.assign(req, value)
    next()
  }
}
