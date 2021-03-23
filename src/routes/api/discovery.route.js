const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');

const auth = require('../../middlewares/auth');
const controller = require('../../controllers/discovery');
const validation = require('../../validations/discovery.validation');

router.get('/feed', validate(validation.feed), auth(), controller.feed);

module.exports = router;
