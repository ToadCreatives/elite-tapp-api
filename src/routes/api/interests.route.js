const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/interests');
const validation = require('../../validations/interests.validation');

router.get('/list', controller.getInterests);

router.put('/me/interests', validate(validation.addInterests), auth(), controller.addInterests);

module.exports = router;
