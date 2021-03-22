const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/profile');
const validation = require('../../validations/profile.validation');

router.get('/me', auth(), controller.getMyProfile);

router.patch('/me', validate(validation.updateProfile), auth(), controller.updateProfile);

router.put('/me/avatar', validate(validation.uploadAvatar), auth(), controller.uploadAvatar);

module.exports = router;
