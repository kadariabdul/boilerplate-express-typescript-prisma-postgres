import { NextFunction, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => any

import httpStatus from 'http-status'

export const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    statusCode: 404,
    success: false,
    message: 'Resource Not Found'
  })
}

// handle internal server errors
export const internalServerError = (err: unknown, res: Response) => {
  return res.status(404).json({
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    success: false,
    message: 'Error',
    data: err
  })
}
