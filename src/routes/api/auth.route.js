const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const authController = require('../../controllers/auth');
const validation = require('../../validations/auth.validation');

router.post('/login', validate(validation.login), authController.login);
router.post('/login/token', validate(validation.loginToken), authController.loginRefreshToken);
// router.get('/confirm', authController.confirm);

module.exports = router;
