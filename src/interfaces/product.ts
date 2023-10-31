export interface IProduct {
  id: number
  name: string
  description: string
  category: string
  price: number
  image: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}