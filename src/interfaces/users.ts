export interface ICreateUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ICreateToken {
  userId: number
  accessToken: string
  refreshToken: string
}

export interface ILoginData {
  id: number
  firstName: string
  lastName: string
  email: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
}
