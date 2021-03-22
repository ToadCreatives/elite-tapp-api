const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');

const auth = require('../../middlewares/auth');
const controller = require('../../controllers/connection');
const validation = require('../../validations/connection.validation');

router.post('/add', validate(validation.addByUsername), auth(), controller.addByUsername);

router.get('/list', auth(), controller.list);

module.exports = router;
