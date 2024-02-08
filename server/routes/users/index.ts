import { registerHandler, loginHandler, logoutHandler } from './handler'
import { Router } from 'express'

const router = Router()
router.route('/register').post(registerHandler)
router.route('/login').post(loginHandler)
router.route('/logout').post(logoutHandler)

export default router
