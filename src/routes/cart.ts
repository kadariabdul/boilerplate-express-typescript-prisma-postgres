import { Router } from 'express'
import Controller from '../controller/cart'
import AuthController from '../controller/auth'
import validateBody from '../middlewares/validation'
import cartValidationSchemas from '../validations/cart'
const router: Router = Router()
const controller = new Controller()
const authController = new AuthController()

/**
 * @swagger
 * /cart:
 *   get:
 *     description: Use to get all products from the cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '500':
 *         $ref: '#/components/responses/500'
 */

router.get('/', authController.verifyAuth, controller.getAllProductsFromCart);
/**
 * @swagger
 * /cart/count:
 *   get:
 *     description: Use to get the total number of products in the cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '500':
 *         $ref: '#/components/responses/500'
 */

router.get('/count', authController.verifyAuth, controller.countProductInCart);
/**
 * @swagger
 * /cart:
 *   post:
 *     description: Add a product to the cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Product added to the cart successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '500':
 *         $ref: '#/components/responses/500'
 */

router.post('/', authController.verifyAuth, validateBody(cartValidationSchemas.cart), controller.addProductToCart);
/**
 * @swagger
 * /cart:
 *   delete:
 *     description: Remove a product from the cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Product removed from the cart successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '500':
 *         $ref: '#/components/responses/500'
 */

router.delete('/', authController.verifyAuth, validateBody(cartValidationSchemas.cart), controller.removeProductFromCart);
/**
 * @swagger
 * /cart/product:
 *   delete:
 *     description: Remove a product from the cart by product ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Product removed from the cart by product ID successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '500':
 *         $ref: '#/components/responses/500'
 */

router.delete('/product', authController.verifyAuth, validateBody(cartValidationSchemas.cart), controller.removeProductFromCartByProductId);


export default router
