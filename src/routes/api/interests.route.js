const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/interests');
const validation = require('../../validations/interests.validation');

router.get('/list', controller.list);

router.get('/me', auth(), controller.getMyInterests);

router.put('/me', validate(validation.addInterests), auth(), controller.addInterests);

module.exports = router;
