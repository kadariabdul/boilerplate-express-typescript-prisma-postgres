import { INewGeneratedAccessTokenResponse, IUser, payload } from '../interfaces/index'
import { PrismaClient } from '@prisma/client'
import { ICreateUser, ILoginResponse, ILoginData } from '../interfaces/users'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import UserServices from './users'
const userServices = new UserServices()
const prisma = new PrismaClient()

async function generatesAccessToken(payload: payload): Promise<string | undefined> {
  try {
    const secret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret
    return await jwt.sign(payload, secret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    })
  } catch (error) {
    throw new Error('Error While Generating Token')
  }
}

async function generatesRefreshToken(payload: payload): Promise<string | undefined> {
  try {
    const secret: Secret = process.env.REFRESH_TOKEN_SECRET as Secret
    return await jwt.sign(payload, secret, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    })
  } catch (error) {
    throw new Error('Error While Generating refresh Token')
  }
}

export default class CommonServices {
  /**
   *
   * @param data
   * @returns boolean | IUser
   */
  public signup = async (data: ICreateUser): Promise<IUser | null> => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const userData = await userServices.createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword
      })
      if (!userData) {
        return null
      }
      return userData
    } catch (error) {
      return null
    }
  }

  public login = async (data: ILoginData): Promise<ILoginResponse> => {
    try {
      const payload: payload = {
        data: data
      }
      const accessToken = await generatesAccessToken(payload)
      const refreshToken = await generatesRefreshToken(payload)
      if (refreshToken && accessToken) {
        await prisma.token.create({
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            userId: data.id
          }
        })
        return {
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      } else {
        throw new Error('Error While Generating Token')
      }
    } catch (error) {
      throw new Error('Error While Generating Token')
    }
  }

  public verifyAuth = async (token: string): Promise<ILoginData | null> => {
    try {
      const secret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret
      const accessToken = token.split(' ')[1]
      if (!accessToken) {
        return null
      }
      const tokenData = userServices.findOneTokenDB([{ isDeleted: false }, { accessToken: accessToken }])
      if (tokenData === null) {
        return null
      }
      const decoded = await jwt.verify(accessToken, secret)
      if (decoded != undefined) {
        const data = JSON.parse(JSON.stringify(decoded)).data

        const userData = await userServices.findByIdUser(data.id)
        // Check if user data is null then return error
        if (userData === undefined || userData === null) {
          return null
        }
        if (userData.isDeleted === true) {
          return null
        }
        return JSON.parse(
          JSON.stringify({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          })
        )
      } else {
        return null
      }
    } catch (error) {
      throw new Error('Error While Verifying Access Token')
    }
  }
  public verifyRefreshAuthAndGeneratesAccessToken = async (
    token: string
  ): Promise<INewGeneratedAccessTokenResponse | null> => {
    try {
      const secret: Secret = process.env.REFRESH_TOKEN_SECRET as Secret
      const refreshToken = token.split(' ')[1]
      if (!refreshToken) {
        return null
      }
      const tokenData = await userServices.findOneTokenDB([{ isDeleted: false }, { refreshToken: refreshToken }])
      if (tokenData === null) {
        return null
      }
      const decoded = await jwt.verify(refreshToken, secret)
      if (decoded != undefined) {
        const data = JSON.parse(JSON.stringify(decoded)).data
        const userData = await userServices.findByIdUser(data.id)
        // Check if user data is null then return error
        if (userData === undefined || userData === null) {
          return null
        }
        if (userData.isDeleted === true) {
          return null
        }
        const payload = {
          data: {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          }
        }
        const accessToken = await generatesAccessToken(payload)
        // store Token
        await prisma.token.update({
          where: {
            id: tokenData.id
          },
          data: {
            accessToken: accessToken
          }
        })
        if (accessToken) {
          return {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            accessToken
          }
        } else {
          return null
        }
      } else {
        // if token verification failed send 401 response
        return null
      }
    } catch (error) {
      throw new Error('Error While Verifying Refresh Token')
    }
  }
}
