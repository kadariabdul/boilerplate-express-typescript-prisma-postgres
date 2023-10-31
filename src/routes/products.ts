import { Router } from 'express'
import Controller from '../controller/products'
import AuthController from '../controller/auth'
const router: Router = Router()
const controller = new Controller()
const authController = new AuthController()

/**
 * @swagger
 * /products:
 *   get:
 *     description: Use to request all products with pagination and search
 *     tags:
 *       - Products
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search string by name in products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

router.get('/', authController.verifyAuth, controller.getAllProductsWithPagination)

export default router
