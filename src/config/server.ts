import { DatabaseConnection } from "../infra/database/connection";
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import Routes from './routes'


export class AppServer {

    public express: express.Application
    private router: express.Router

    constructor() {
        dotenv.config()
        this.router = express.Router()
        this.express = express()
        new DatabaseConnection().conection()
        this.middlewares()
        this.routes()
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
        this.express.use(cors())
    }

    private routes(): void {
        this.express.use('/api', this.router)
        new Routes(this.router)
    }
}