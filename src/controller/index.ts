import { Request, Response } from 'express'
import {
  sendCreatedResponse,
  sendError,
  sendInvalidRequest,
  sendNotFound,
  sendSuccessResponse
} from '../helper/responseMethods'
import CommonServices from '../services/index'
import bcrypt from 'bcrypt'
import UserServices from '../services/users'
const userServices = new UserServices()
const commonServices = new CommonServices()

export default class CommonController {
  public getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await userServices.findUsers()
      return sendSuccessResponse(res, 'User list', users ?? {})
    } catch (error) {
      return sendError(res, error)
    }
  }

  public signUp = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, firstName, lastName, password } = req.body
      const userData = await userServices.findOneUser([{ isDeleted: false }, { email: email }])
      if (userData) {
        return sendInvalidRequest(res, 'Email Already Exits')
      }
      const user = await commonServices.signup({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
      })
      if (user === null) {
        return sendError(res, {
          message: 'Error While Signup User'
        })
      }
      return sendCreatedResponse(res, 'User Signup Successfully', user)
    } catch (error) {
      return sendError(res, error)
    }
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body
      const userData = await userServices.findOneUser([{ isDeleted: false }, { email: email }])
      if (userData == null) {
        return sendNotFound(res, 'User Not Found')
      }
      const passCompareResult = await bcrypt.compareSync(password, userData.password)
      if (passCompareResult === false) {
        return sendInvalidRequest(res, 'User password does not match')
      }
      const loginTokens = await commonServices.login({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      })
      if (loginTokens === null) {
        return sendError(res, {
          message: 'Error While Login User'
        })
      }
      return sendSuccessResponse(res, 'Login Sucessfully', {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        accessToken: loginTokens.accessToken,
        refreshToken: loginTokens.refreshToken
      })
    } catch (error) {
      return sendError(res, error)
    }
  }
}
