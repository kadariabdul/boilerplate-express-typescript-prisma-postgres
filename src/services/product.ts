import { Prisma, PrismaClient } from '@prisma/client'
import { IProduct } from '../interfaces/product'
const prisma = new PrismaClient()

export default class ProductServices {
  public findAllProductWithPagination = async (
    skip: number,
    take: number,
    nameSearch?: string
  ): Promise<IProduct[] | null> => {
    try {
      const where: Prisma.ProductWhereInput = {
        isDeleted: false,
      };

      if (nameSearch) {
        where.name = {
          contains: nameSearch,
          mode: 'insensitive',
        };
      }

      const productData = await prisma.product.findMany({
        where: where,
        skip: skip,
        take: take,
        include: {
          Cart: true,
        },
      });

      if (!productData) {
        return null;
      }

      return productData;
    } catch (error) {
      throw new Error('Error While Finding Todo');
    }
  }

}
