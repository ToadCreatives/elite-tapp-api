const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const controller = require('../../controllers/user');
const validation = require('../../validations/user.validation');
const auth = require('../../middlewares/auth');

router.post('/register', validate(validation.register), controller.register);

router.post('/activation/resend', validate(validation.resendActivationCode), controller.resendActicationCode);

router.post('/password/reset', validate(validation.resetPassword), controller.resetPassword);

router.post('/password/reset/request', validate(validation.sendPasswordReset), controller.sendPasswordReset);

router.get('/check/username', validate(validation.isUsernameAvailable), controller.isUsernameAvailable);

router.put('/username', validate(validation.setUsername), auth({ usernameRequired: false }), controller.setUsername);

module.exports = router;
