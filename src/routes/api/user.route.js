const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const userController = require('../../controllers/user');
const validation = require('../../validations/user.validation');

router.post('/register', validate(validation.register), userController.register);

router.post('/activation/resend', validate(validation.resendActivationCode), userController.resendActicationCode);

router.post('/password/reset', validate(validation.resetPassword), userController.resetPassword);

router.post('/password/reset/request', validate(validation.sendPasswordReset), userController.sendPasswordReset);

router.get('/check/username', validate(validation.checkAvailability), userController.isUsernameAvailable);

router.get('/check/email', validate(validation.checkAvailability), userController.isEmailAvailable);

router.get('/check/phone', validate(validation.checkAvailability), userController.isPhoneAvailable);

module.exports = router;
