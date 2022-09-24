import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import clientRoutes from './routes/client.routes'
import accountRoutes from './routes/account.routes'
import movementRoutes from './routes/movement.routes'


const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(clientRoutes, accountRoutes, movementRoutes)

export default app;