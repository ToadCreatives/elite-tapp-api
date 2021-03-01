const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const userController = require('../../controllers/user');
const validation = require('../../validations/user.validation');

router.post('/register', validate(validation.register), userController.register);

module.exports = router;
