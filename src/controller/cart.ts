import { Request, Response } from 'express'
import {
  sendError,
  sendNotFound,
  sendSuccessResponse
} from '../helper/responseMethods'
import CartServices from '../services/cart'
const cartServices = new CartServices()

export default class CartController {

  // write a controller to add product to cart
  public addProductToCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const productId = req.body.productId
      const userId = req.loggedInUser.id
      const cart = await cartServices.addProductToCart(productId, userId)
      if (cart) {
        return sendSuccessResponse(res, 'Product added to cart', cart || {})
      } else {
        return sendNotFound(res, 'Product Not Found')
      }
    } catch (error) {
      return sendError(res, error)
    }
  }

  // write a controller to remove product from cart
  public removeProductFromCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const productId = req.body.productId
      const userId = req.loggedInUser.id
      const cart = await cartServices.removeProductFromCart(productId, userId)
      if (cart) {
        return sendSuccessResponse(res, 'Product removed from cart', cart || {})
      } else {
        return sendNotFound(res, 'Product Not Found')
      }
    } catch (error) {
      return sendError(res, error)
    }
  }

  // write a controller to get all products from cart
  public getAllProductsFromCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.loggedInUser.id
      const cart = await cartServices.getCartByUserId(userId)
      if (cart) {
        return sendSuccessResponse(res, 'Products from cart', cart || {})
      } else {
        return sendNotFound(res, 'Products Not Found')
      }
    } catch (error) {
      return sendError(res, error)
    }
  }

  public countProductInCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.loggedInUser.id
      const count = await cartServices.countProductInCart(userId)
      if (count) {
        return sendSuccessResponse(res, 'Total products in cart', { count })
      } else {
        return sendNotFound(res, 'Products Not Found')
      }
    } catch (error) {
      return sendError(res, error)
    }
  }

  // delete whole product from cart 
  public removeProductFromCartByProductId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const productId = req.body.productId
      const userId = req.loggedInUser.id
      const cart = await cartServices.removeProductFromCartByProductId(productId, userId)
      if (cart) {
        return sendSuccessResponse(res, 'Product removed from cart', cart || {})
      } else {
        return sendNotFound(res, 'Product Not Found')
      }
    } catch (error) {
      return sendError(res, error)
    }
  }
}
