import { Response } from 'express'
import AppError from './appError'
export const sendSuccessResponse = (res: Response, msg: string, data: object | Array<object> = {}) => {
  const resp = {
    statusCode: 200,
    success: true,
    message: msg ? msg : 'Success',
    data: data ?? data
  }
  return res.status(200).json(resp)
}

export const sendCreatedResponse = (res: Response, msg: string, data: object | Array<object> = {}) => {
  const resp = {
    statusCode: 201,
    success: true,
    message: msg ? msg : 'Created',
    data: data ?? data
  }
  return res.status(201).json(resp)
}

export const sendUpdatedResponse = (res: Response, msg: string, data: object | Array<object> = {}) => {
  const resp = {
    statusCode: 202,
    success: true,
    message: msg ? msg : 'Updated',
    data: data ?? data
  }
  return res.status(202).json(resp)
}

export const sendDeletedResponse = (res: Response, msg: string, data: object | Array<object> = {}) => {
  const resp = {
    statusCode: 204,
    success: true,
    message: msg ? msg : 'Created',
    data: data ?? data
  }
  return res.status(204).json(resp)
}

export const sendInvalidRequest = (res: Response, msg: string, data: object | Array<object> = {}) => {
  const resp = {
    statusCode: 400,
    success: false,
    message: msg ? msg : 'Invalid Request',
    data: data ?? data
  }
  return res.status(400).json(resp)
}

export const sendNotFound = (res: Response, msg: string, data: object | Array<object> = {}) => {
  const resp = {
    statusCode: 404,
    success: false,
    message: msg ? msg : 'Not Found',
    data: data ?? data
  }
  return res.status(404).json(resp)
}

export const sendUnAuthorized = (res: Response) => {
  const resp = {
    statusCode: 403,
    success: false,
    message: 'You are unauthorized to access'
  }
  return res.status(403).json(resp)
}
export const sendUnAuthenticated = (res: Response) => {
  const resp = {
    statusCode: 401,
    success: false,
    message: 'Your session is expired, Please login'
  }
  return res.status(401).json(resp)
}

export const sendError = (res: Response, error: Error | AppError | unknown) => {
  const resp = {
    statusCode: 500,
    success: false,
    message: "Error Occurred",
    data: {}
  }
  if (error instanceof AppError) {
    resp.statusCode = error.statusCode;
    resp.message = error.message;
  }
  return res.status(resp.statusCode).json(resp)
}
