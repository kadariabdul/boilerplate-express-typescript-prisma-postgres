import { IUser, IToken } from '../interfaces/index'
import { PrismaClient } from '@prisma/client'
import { ICreateToken, ICreateUser } from '../interfaces/users'
import AppError from '../helper/appError'
const prisma = new PrismaClient()

export default class UserServices {
  /**
   *
   * @param data
   * @returns boolean | IUser
   */
  public createUser = async (data: ICreateUser): Promise<IUser | null> => {
    try {
      const userData = await prisma.user.create({
        data: data
      })
      if (!userData) {
        return null
      }
      return userData
    } catch (error) {
      throw new Error('Error While Creating User')
    }
  }

  /**
   *
   * @param condition
   * @returns boolean | IUser
   */
  public findOneUser = async (condition: Array<object>): Promise<IUser | null> => {
    try {
      const userData = await prisma.user.findFirst({
        where: {
          AND: condition
        }
      })
      if (!userData) {
        throw new AppError(400, "User Not Found");
      }
      return userData
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(500, "Error While Finding User");
      }
    }
  }

  /**
   *
   * @param id number
   * @returns boolean | IUser
   */
  public findByIdUser = async (id: number): Promise<null | IUser> => {
    try {
      const userData = await prisma.user.findUnique({
        where: {
          id: id
        }
      })
      if (!userData) {
        throw new AppError(400, "User Not Found");
      }
      return userData
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(500, "Error While Finding User");
      }
    }
  }

  /**
   *
   * @param condition
   * @returns boolean | IUser
   */
  public findOneTokenDB = async (condition: Array<object>): Promise<IToken | null> => {
    try {
      const tokenData = await prisma.token.findFirst({
        where: {
          AND: condition
        }
      })
      if (tokenData == null) {
        return null
      }
      return tokenData
    } catch (error) {
      throw new Error('Error While Finding Token')
    }
  }

  public createTokenDB = async (data: ICreateToken): Promise<IToken | null> => {
    try {
      const tokenData = await prisma.token.create({
        data: data
      })
      if (tokenData == null) {
        return null
      }
      return tokenData
    } catch (error) {
      throw new Error('Error While Creating Token')
    }
  }

  public findByIdToken = async (id: number): Promise<null | IToken> => {
    try {
      const tokenData = await prisma.token.findUnique({
        where: {
          id: id
        }
      })
      if (!tokenData) {
        return null
      }
      return tokenData
    } catch (error) {
      throw new Error('Error While Finding Token')
    }
  }

  public findUsers = async (): Promise<null | IUser[]> => {
    try {
      const users = await prisma.user.findMany({
        where: {
          isDeleted: false
        }
      })
      if (!users) {
        return null
      }
      return users
    } catch (error) {
      throw new Error('Error While Finding Users')
    }
  }
}
