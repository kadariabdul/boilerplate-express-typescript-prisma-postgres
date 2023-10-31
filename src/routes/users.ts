import { Router } from 'express'
import Controller from '../controller'
import AuthController from '../controller/auth'
const router: Router = Router()
const controller = new Controller()
const authController = new AuthController()

/**
 * @swagger
 * /users:
 *      get:
 *          summary: Get all users
 *          tags:
 *              - Users
 *          description: Get all users
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  statusCode:
 *                                      type: number
 *                                      example: 200
 *                                  success:
 *                                      type: boolean
 *                                      example: true
 *                                  message:
 *                                      type: string
 *                                      example: "User list"
 *                                  data:
 *                                      type: array
 *                                      example: |
 *                                              [{
 *                                                  "id": 1,
 *                                                  "firstName": "ankur",
 *                                                  "lastName": "albiorix",
 *                                                  "email": "ankur@yopmail.com",
 *                                                  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJhbmt1ciIsImxhc3ROYW1lIjoiYWxiaW9yaXgiLCJlbWFpbCI6ImFua3VyQHlvcG1haWwuY29tIn0sImlhdCI6MTY3OTQxODI4OCwiZXhwIjoxNjc5NDIwMDg4fQ.7IUA2d6gc9Gl1FVOWrrEnWVPf0NxPCr-TJAlTnO021o"
 *                                              }]
 *              401:
 *                 $ref: '#/components/responses/401'
 *              500:
 *                 $ref: '#/components/responses/500'
 */
router.get('/', authController.verifyAuth, controller.getAllUsers)

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     401:
 *       description: Unauthenticated User
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                 type: number
 *                 example: 401
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Your session is expired, Please login"
 *     500:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                 type: number
 *                 example: 500
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Error Occurred"
 *               data:
 *                 type: object
 *                 example: {}
 */

export default router
