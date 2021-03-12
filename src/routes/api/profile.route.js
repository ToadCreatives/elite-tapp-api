const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/profile');
const validation = require('../../validations/profile.validation');

router.patch('/me', validate(validation.updateProfile), auth(), controller.updateProfile);

module.exports = router;
