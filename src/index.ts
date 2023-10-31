import nocache from 'nocache'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import apiV1 from './routes/index'
import * as errorHandler from './helper/errorHandlers'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { swaggerDocOptions } from './swagger'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
dotenv.config()

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      loggedInUser: {
        id: number
        firstName: string
        lastName: string
        email: string
      }
    }
  }
}
const swaggerSpec = swaggerJSDoc(swaggerDocOptions)
class App {
  public express: express.Application

  constructor() {
    this.express = express()
    dotenv.config()
    this.setDefaultMiddlewares()
    this.setRoutes()
    this.catchErrors()
  }

  private setDefaultMiddlewares(): void {
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(nocache())
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(helmet())
    this.express.use(express.static('public'))
  }

  private setRoutes(): void {
    this.express.use('/', apiV1)
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound)
    this.express.use(errorHandler.internalServerError)
  }
}

const router = new App().express

/** Server Configurations */
router.listen(process.env.PORT || 5000, () => {
  console.log(`The API server has successfully started. \nListening at ${process.env.PORT || 'http://localhost:5000'}`)
})
process.on('SIGINT', function () {
  prisma.$disconnect() // Disconnect from Prisma
  console.log('Prisma Disconnected.')
  process.exit(0)
})
process.on('SIGTERM', () => {
  prisma.$disconnect() // Disconnect from Prisma
  console.log('Prisma Disconnected.')
  process.exit(0)
})
