import express from 'express'
//import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Datos de prueba
const blogs = [
  { _id: '1', title: 'Primer post', summary: 'Resumen del primer post', date: new Date() },
  { _id: '2', title: 'Segundo post', summary: 'Resumen del segundo post', date: new Date() },
  { _id: '3', title: 'Tercer post', summary: 'Resumen del tercer post', date: new Date() },
  { _id: '4', title: 'Cuarto post', summary: 'Resumen del cuarto post', date: new Date() },
  { _id: '5', title: 'Quinto post', summary: 'Resumen del quinto post', date: new Date() },
  { _id: '6', title: 'Sexto post', summary: 'Resumen del sexto post', date: new Date() }
]

router.get('/', (req, res) => {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || blogs.length

  const paginated = blogs.slice(skip, skip + limit)
  res.json({ blogs: paginated })
})

export default router
