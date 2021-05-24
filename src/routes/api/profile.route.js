const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/profile');
const validation = require('../../validations/profile.validation');

router.get('/view/:username', controller.view);

router.get('/me', auth({ usernameRequired: false }), controller.getMyProfile);

router.patch('/me', validate(validation.updateProfile), auth({ usernameRequired: false }), controller.updateProfile);

router.put('/me/avatar', validate(validation.uploadAvatar), auth({ usernameRequired: false }), controller.uploadAvatar);

module.exports = router;
