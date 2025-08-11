import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blogs.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/login', authRoutes)
app.use('/api/blogs', blogRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))
