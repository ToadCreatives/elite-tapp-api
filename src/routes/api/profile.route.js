const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/profile');
const validation = require('../../validations/profile.validation');

router.patch('/me', validate(validation.updateProfile), auth(), controller.updateProfile);

router.put('/me/interests', validate(validation.addInterests), auth(), controller.addInterests);

module.exports = router;
