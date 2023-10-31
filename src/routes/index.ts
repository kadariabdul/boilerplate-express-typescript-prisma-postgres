import { Router } from 'express'
import Controller from '../controller'
import AuthController from '../controller/auth'
import validateBody from '../middlewares/validation'
import validationSchemas from '../validations'
import usersRoutes from './users'
import productRoutes from './products'
import cartRoutes from './cart'

const router: Router = Router()
const controller = new Controller()
const authController = new AuthController()

// all others routes imported here
router.use('/users', usersRoutes)
router.use('/products', productRoutes)
router.use('/cart', cartRoutes)

/**
 * @swagger
 * /signup:
 *      post:
 *          summary: Signup New User
 *          tags:
 *              - Auth
 *          description: Signup api to create a new Account.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                                  example: john
 *                              lastName:
 *                                  type: string
 *                                  example: Watson
 *                              email:
 *                                  type: string
 *                                  example: john@yopmail.com
 *                              password:
 *                                  type: string
 *                                  example: Hello@1234
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  statusCode:
 *                                      type: number
 *                                      example: 201
 *                                  success:
 *                                      type: boolean
 *                                      example: true
 *                                  message:
 *                                      type: string
 *                                      example: "User Signup Successfully"
 *                                  data:
 *                                      type: object
 *                                      example: |
 *                                              {
 *                                                   "id": 2,
 *                                                   "email": "ankur2@yopmail.com",
 *                                                   "firstName": "ankur",
 *                                                   "lastName": "albiorix",
 *                                                   "password": "$2b$10$5wBbAkg92IwaqH4SBHBOouM9FaVtqjeGOhnd.fsQwmhQ3rjQkD30.",
 *                                                   "createdAt": "2023-03-21T15:21:20.444Z",
 *                                                   "updatedAt": "2023-03-21T15:21:20.444Z",
 *                                                   "isDeleted": false
 *                                               }
 *              400:
 *                  description: Email Already Exits
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  statusCode:
 *                                      type: number
 *                                      example: 400
 *                                  success:
 *                                      type: boolean
 *                                      example: false
 *                                  message:
 *                                      type: string
 *                                      example: Email Already Exits
 *                                  data:
 *                                      type: object
 *                                      example: {}
 *              Validation:
 *                  description: Validation Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  statusCode:
 *                                      type: number
 *                                      example: 400
 *                                  success:
 *                                      type: boolean
 *                                      example: false
 *                                  message:
 *                                      type: string
 *                                      example: "Validation Error"
 *                                  data:
 *                                      type: string
 *                                      example: "email is required"
 *              500:
 *                 $ref: '#/components/responses/500'
 */
router.post('/signup', validateBody(validationSchemas.signup), controller.signUp)
/**
 * @swagger
 * /login:
 *      post:
 *          summary: Login User
 *          tags:
 *              - Auth
 *          description: Login api to signin Account.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: john@yopmail.com
 *                              password:
 *                                  type: string
 *                                  example: Hello@1234
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
 *                                      example: "Login Sucessfully"
 *                                  data:
 *                                      type: object
 *                                      example: |
 *                                              {
 *                                                  "id": 1,
 *                                                  "firstName": "ankur",
 *                                                  "lastName": "albiorix",
 *                                                  "email": "ankur@yopmail.com",
 *                                                  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJhbmt1ciIsImxhc3ROYW1lIjoiYWxiaW9yaXgiLCJlbWFpbCI6ImFua3VyQHlvcG1haWwuY29tIn0sImlhdCI6MTY3OTQxNDg2OCwiZXhwIjoxNjc5NDE2NjY4fQ.uImd8lVNkPaLp2597WpLEjSPsz_tJxE9vAwir8G0ViY",
 *                                                  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJhbmt1ciIsImxhc3ROYW1lIjoiYWxiaW9yaXgiLCJlbWFpbCI6ImFua3VyQHlvcG1haWwuY29tIn0sImlhdCI6MTY3OTQxNDg2OCwiZXhwIjoxNjgwMDE5NjY4fQ.Ot1CODfhnuT1LeFFJSdNwu90WRKkPtYtW3a1yNVqnX4"
 *                                              }
 *              404:
 *                  description: Email not Exits
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  statusCode:
 *                                      type: number
 *                                      example: 404
 *                                  success:
 *                                      type: boolean
 *                                      example: false
 *                                  message:
 *                                      type: string
 *                                      example: User Not Found
 *                                  data:
 *                                      type: object
 *                                      example: {}
 *              Validation:
 *                  description: Validation Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  statusCode:
 *                                      type: number
 *                                      example: 400
 *                                  success:
 *                                      type: boolean
 *                                      example: false
 *                                  message:
 *                                      type: string
 *                                      example: "Validation Error"
 *                                  data:
 *                                      type: string
 *                                      example: "email is required"
 *              500:
 *                 $ref: '#/components/responses/500'
 */
router.post('/login', validateBody(validationSchemas.login), controller.login)

/**
 * @swagger
 * /generates-accesstoken:
 *      post:
 *          summary: Generates new accesstoken
 *          tags:
 *              - Token
 *          description: Generates new accesstoken based on REFRESH TOKEN.
 *          securitySchemes:
 *              bearerAuth:            # arbitrary name for the security scheme
 *                type: http
 *                scheme: bearer
 *                bearerFormat: JWT
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
 *                                      example: "New AccessToken Generated Sucessfully"
 *                                  data:
 *                                      type: object
 *                                      example: |
 *                                              {
 *                                                  "id": 1,
 *                                                  "firstName": "ankur",
 *                                                  "lastName": "albiorix",
 *                                                  "email": "ankur@yopmail.com",
 *                                                  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJhbmt1ciIsImxhc3ROYW1lIjoiYWxiaW9yaXgiLCJlbWFpbCI6ImFua3VyQHlvcG1haWwuY29tIn0sImlhdCI6MTY3OTQxODI4OCwiZXhwIjoxNjc5NDIwMDg4fQ.7IUA2d6gc9Gl1FVOWrrEnWVPf0NxPCr-TJAlTnO021o"
 *                                              }
 *              401:
 *                 $ref: '#/components/responses/401'
 *              500:
 *                 $ref: '#/components/responses/500'
 */

router.post('/generates-accesstoken', authController.verifyRefreshAuthAndGeneratesAccessToken)
export default router
