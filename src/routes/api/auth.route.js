const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const authController = require('../../controllers/auth');
const validation = require('../../validations/auth.validation');

router.post('/login', validate(validation.login), authController.login);
router.post('/login/token', validate(validation.loginToken), authController.loginRefreshToken);
router.post('/verify/account', validate(validation.verifyUser), authController.verifyAccount);
router.post('/verify/otp', validate(validation.verifyOtp), authController.verifyOtpRequest);

module.exports = router;
