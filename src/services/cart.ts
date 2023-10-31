import { PrismaClient } from '@prisma/client'
import { ICart } from '../interfaces/cart';
const prisma = new PrismaClient()

export default class CartServices {
  public addProductToCart = async (productId: number, userId: number): Promise<ICart | null> => {
    try {
      const productData = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          Cart: true,
        }
      });
      if (!productData) {
        return null;
      }
      const cartData = await prisma.cart.findFirst({
        where: {
          userId: userId,
          productId: productId,
        }
      });

      if (cartData && cartData.userId === userId && cartData.productId === productId) {
        const updateCartData = await prisma.cart.update({
          where: {
            id: cartData.id,
          },
          data: {
            quantity: cartData.quantity + 1,
          },
          include: {
            product: true,
          }
        });
        return updateCartData;
      } else {
        const createCartData = await prisma.cart.create({
          data: {
            userId: userId,
            productId: productId,
            quantity: 1,
          },
          include: {
            product: true,
          }
        });
        return createCartData;
      }
    } catch (error) {
      throw new Error('Error While addProductToCart');
    }
  }

  public removeProductFromCart = async (productId: number, userId: number): Promise<ICart | null> => {
    try {
      const cartData = await prisma.cart.findFirst({
        where: {
          userId: userId,
          productId: productId,
        }
      });
      if (!cartData) {
        return null;
      }
      if (cartData && cartData.userId !== userId && cartData.productId !== productId) {
        return null;
      }
      if (cartData.quantity === 1) {
        const deleteCartData = await prisma.cart.delete({
          where: {
            id: cartData.id,
          },
          include: {
            product: true,
          }
        });
        return deleteCartData;
      }
      const updateCartData = await prisma.cart.update({
        where: {
          id: cartData.id,
        },
        data: {
          quantity: cartData.quantity - 1,
        },
        include: {
          product: true,
        }
      });
      return updateCartData;
    } catch (error) {
      throw new Error('Error While removeProductFromCart');
    }
  }

  public removeProductFromCartByProductId = async (productId: number, userId: number): Promise<ICart | null> => {
    try {
      const cartData = await prisma.cart.findFirst({
        where: {
          userId: userId,
          productId: productId,
        }
      });
      if (!cartData) {
        return null;
      }
      if (cartData && cartData.userId !== userId && cartData.productId !== productId) {
        return null;
      }
      const deleteCartData = await prisma.cart.delete({
        where: {
          id: cartData.id,
        },
        include: {
          product: true,
        }
      });
      return deleteCartData;
    } catch (error) {
      throw new Error('Error While removeProductFromCartByProductId');
    }
  }

  public countProductInCart = async (userId: number): Promise<number | null> => {
    try {
      const cartData = await prisma.cart.findMany({
        where: {
          userId: userId,
        },
        include: {
          product: true,
        }
      });
      if (!cartData) {
        return null;
      }
      return cartData.length;
    } catch (error) {
      throw new Error('Error While countProductInCart');
    }
  }

  public getCartByUserId = async (userId: number): Promise<ICart[] | null> => {
    try {
      const cartData = await prisma.cart.findMany({
        where: {
          userId: userId,
        },
        include: {
          product: true,
        }
      });
      if (!cartData) {
        return null;
      }
      return cartData;
    } catch (error) {
      throw new Error('Error While getCartByUserId');
    }
  }
}
