import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Usuario de prueba (más adelante lo traemos de MongoDB)
const userDB = {
  email: 'admin@maternidadyemociones.com.ar',
  passwordHash: bcrypt.hashSync('Berugo', 10), // Contraseña: Berugo
  name: 'Admin'
}

router.post('/', (req, res) => {
  const { email, password } = req.body

  if (email !== userDB.email) {
    return res.status(400).json({ message: 'Usuario no encontrado' })
  }

  const isPasswordValid = bcrypt.compareSync(password, userDB.passwordHash)
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Contraseña incorrecta' })
  }

  const token = jwt.sign(
    { email: userDB.email, name: userDB.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({
    user: { email: userDB.email, name: userDB.name },
    token
  })
})

export default router
