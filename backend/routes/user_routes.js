import express from 'express'
import {
    register,
} from '../controllers/user_controllers.js'

const router = express.Router()

router.post('/register', register)

export default router