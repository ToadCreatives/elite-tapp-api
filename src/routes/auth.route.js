'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const validator = require('express-validation')
const { create } = require('../validations/user.validation')
const auth = require('../middlewares/authorization')

router.post('/register', validator(create), authController.register) // validate and register

/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', authController.login) // login
router.get('/confirm', authController.confirm)

// Authentication example
router.get('/secret1', auth(), (req, res) => {
  // example route for auth
  res.json({ message: 'Anyone can access(only authorized)' })
})
router.get('/secret2', auth(['admin']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only admin can access' })
})
router.get('/secret3', auth(['user']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only user can access' })
})

module.exports = router
