import { Request, Response } from 'express'
import {
  sendError,
  sendNotFound,
  sendSuccessResponse
} from '../helper/responseMethods'
import ProductServices from '../services/product'
const productServices = new ProductServices()

export default class ProductController {
  public getAllProductsWithPagination = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = req.query.page ? parseInt(req.query.page.toString()) : 1
      const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10
      const search = req.query.search ? req.query.search.toString() : ''
      const skip = (page == 1 ? 0 : ((page - 1) * limit));
      const take = limit;
      const todos = await productServices.findAllProductWithPagination(skip, take, search)
      if (todos) {
        return sendSuccessResponse(res, 'Products list', todos || {})
      } else {
        return sendNotFound(res, 'Products Not Found')
      }
    } catch (error) {
      return sendError(res, error)
    }
  }
}
