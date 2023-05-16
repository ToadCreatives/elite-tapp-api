const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const controller = require('../../controllers/auth');
const validation = require('../../validations/auth.validation');

router.post('/login', validate(validation.login), controller.login);
router.post('/login/token', validate(validation.loginToken), controller.loginRefreshToken);
router.post('/verify/account', validate(validation.verifyUser), controller.verifyAccount);
router.post('/verify/otp', validate(validation.verifyOtp), controller.verifyOtpRequest);

module.exports = router;
