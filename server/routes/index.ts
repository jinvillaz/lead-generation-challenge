import { Router } from 'express'
import usersRouter from './users'

const router = Router()
router.use('/tasks', usersRouter)

export default router
