import { NextFunction, Request, Response } from 'express'
import CommonServices from '../services/index'
const commonServices = new CommonServices()
import { sendError, sendSuccessResponse, sendUnAuthenticated } from '../helper/responseMethods'

export default class AuthController {
  public verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const token = req.headers['authorization']
      if (!token) {
        return sendUnAuthenticated(res)
      }
      const verifiedData = await commonServices.verifyAuth(token)
      if (verifiedData == null) {
        return sendUnAuthenticated(res)
      }
      req['loggedInUser'] = verifiedData
      return next()
    } catch (error) {
      return sendUnAuthenticated(res)
    }
  }
  public verifyRefreshAuthAndGeneratesAccessToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = req.headers['authorization']
      if (!token) {
        return sendUnAuthenticated(res)
      }
      const tokenGeneratedData = await commonServices.verifyRefreshAuthAndGeneratesAccessToken(token)
      if (tokenGeneratedData === null) {
        return sendUnAuthenticated(res)
      }
      return sendSuccessResponse(res, 'New AccessToken Generated Sucessfully', tokenGeneratedData)
    } catch (error) {
      return sendError(res, error)
    }
  }
}
