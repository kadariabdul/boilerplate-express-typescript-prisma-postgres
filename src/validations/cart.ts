import Joi from 'joi'

class CartValidationSchemas {
  static cart = {
    body: Joi.object().keys({
      productId: Joi.number().required()
    })
  }
}

export default CartValidationSchemas
