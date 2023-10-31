export interface ITodo {
  id: number
  title: string
  content: string
}

export interface ICreateTodo {
  title: string
  content: string
  userId: number
}

export interface ITodoResponse {
  id: number
  title: string
  content: string
  userId: number
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}
