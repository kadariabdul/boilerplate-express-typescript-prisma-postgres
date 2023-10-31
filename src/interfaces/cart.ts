import { IUser } from "."
import { IProduct } from "./product"


export interface ICart {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  product: IProduct;
}
