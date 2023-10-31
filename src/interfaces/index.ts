export interface payload {
  data: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}

export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  Token?: Array<IToken>
}

export interface IToken {
  id: number
  userId: number
  accessToken: string
  refreshToken: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  user?: IUser
}

export interface INewGeneratedAccessTokenResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  accessToken: string
}
